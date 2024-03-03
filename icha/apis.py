import secrets
from typing import Any, Coroutine

import sqlalchemy
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app import app
from icha import data, tokens, table
from icha.data import LoginRes, TokensRes, GachaListRes
from icha.error import ErrorIdException, ErrorIds
from icha.repo import user_repo, gacha_repo, thumbnail_repo, licence_repo, content_repo, pulled_repo, content_image_repo
from icha.table import get_session, UserTable
from icha.tokens import get_login_user, get_token, get_login_user_or_none


@app.get("/api/health")
async def health():
    return {"ok": True}


@app.post("/api/login/refresh")
async def refresh_token(
        session: AsyncSession = Depends(get_session),
        token: data.JwtTokenData = Depends(get_token)
) -> TokensRes:
    user = await user_repo.by_token(session, token)
    return tokens.create_tokens(user)


@app.post("/api/login")
async def login(req: data.LoginBody, session: AsyncSession = Depends(get_session)) -> LoginRes:
    user = await user_repo.by_email(session, req.email)
    if not user.check_password(req.password):
        raise ErrorIdException(ErrorIds.USER_LOGIN_FAILED)
    return user.to_login_res()


@app.post("/api/user")
async def create_user(body: data.UserBody, session: AsyncSession = Depends(get_session)) -> LoginRes:
    user = user_repo.create_user(session, body)
    await session.commit()
    await session.refresh(user)
    return user.to_login_res()


@app.put("/api/user/self")
async def edit_user(
        user_put_body: data.UserPutBody,
        session: AsyncSession = Depends(get_session),
        user: table.UserTable = Depends(get_login_user)
) -> data.UserRes:
    user.apply(
        name=user_put_body.name,
        email=user_put_body.email,
        password=user_put_body.password,
        self_produce=user_put_body.self_produce
    )
    await session.commit()
    await session.refresh(user)
    return user.to_user_res()


@app.get("/api/user/self")
async def get_self_user(
        user: UserTable = Depends(get_login_user),
) -> data.UserRes:
    return user.to_user_res()


@app.get("/api/user/{user_id}")
async def get_user(
        user_id: int,
        session: AsyncSession = Depends(get_session),
        user: UserTable | None = Depends(get_login_user_or_none)
) -> data.UserRes:
    if user is not None:
        if user.uid == user_id:
            return user.to_user_res()
    res = await session.execute(
        sqlalchemy.select(table.UserTable).where(table.UserTable.uid == user_id)
    )
    res = res.scalar_one()
    if res is None:
        raise ErrorIdException(ErrorIds.USER_NOT_FOUND)
    return res


@app.post("/api/gacha")
async def create_gacha(
        body: data.GachaBody,
        session: AsyncSession = Depends(get_session),
        user: table.UserTable = Depends(get_login_user),
) -> data.GachaRes:
    gacha = gacha_repo.create_gacha(session, body, user)
    await session.flush([gacha])
    licence = licence_repo.create(session, body.licence, gacha)
    thumbnail = thumbnail_repo.create(session, body.thumbnail, gacha)

    content_tables = list[tuple[table.ContentTable, data.GachaContentBody]]()
    for content_data in body.contents:
        content_table = content_repo.create(session, content_data, gacha)
        content_tables.append((content_table, content_data))
    contents_tuples = list[tuple[table.ContentTable, table.ContentImageTable]]()
    for (content_table, content_data) in content_tables:
        await session.flush([content_table])
        await session.refresh(content_table)
        content_image = content_image_repo.create(session, content_data.image, content_table)
        contents_tuples.append((content_table, content_image))
        await session.flush([content_image])

    commit = session.commit()
    gacha_refresh = session.refresh(gacha)
    thumbnail_refresh = session.refresh(thumbnail)
    licence_refresh = session.refresh(licence)
    user_refresh = session.refresh(user)
    content_refreshes = list[Coroutine]()
    for (content_table, content_image) in contents_tuples:
        content_refreshes.append(session.refresh(content_table))
        content_refreshes.append(session.refresh(content_image))
    await commit
    await gacha_refresh
    await thumbnail_refresh
    await licence_refresh
    await user_refresh
    for content_refresh in content_refreshes:
        await content_refresh
    contents = list[data.GachaContentRes]()
    for (content_table, content_image) in contents_tuples:
        content_table: table.ContentTable
        content_image: table.ContentImageTable
        contents.append(content_table.to_content_res(content_image.to_image_data(), True, user.uid))
    return gacha.to_gacha_res(thumbnail.to_image_data(), licence.to_licence_data(), contents)


@app.get("/api/gacha/{uid}")
async def get_gacha(
        uid: int,
        session: AsyncSession = Depends(get_session),
        user: table.UserTable | None = Depends(get_login_user_or_none),
) -> data.GachaRes:
    gacha_coroutine = gacha_repo.by_id(session, uid)
    gacha = await gacha_coroutine
    thumbnail_coroutine = thumbnail_repo.by_gacha(session, gacha)
    licence_coroutine = licence_repo.by_gacha(session, gacha)
    content_tables_coroutine = content_repo.all_with_image_by_gacha(session, gacha)
    contents = list[data.GachaContentRes]()
    thumbnail = await thumbnail_coroutine
    post_user = user_repo.by_uid(session, gacha.user_id)

    post_user = await post_user
    for (content, image) in await content_tables_coroutine:
        content: table.ContentTable
        image: table.ContentImageTable
        if user is None:
            is_pulled = False
        else:
            is_pulled = await content_repo.is_content_pulled(session, content, user)
        contents.append(content.to_content_res(image.to_image_data(), is_pulled, post_user.uid))
    licence = await licence_coroutine
    return gacha.to_gacha_res(thumbnail.to_image_data(), licence.to_licence_data(), contents)


@app.get("/api/gacha")
async def get_gacha_list(
        order: str = "new",
        size: int = 16,
        page: int = 0,
        pulled: bool = False,
        search: str = "",
        session: AsyncSession = Depends(get_session),
        user: table.UserTable = Depends(get_login_user_or_none)
) -> list[GachaListRes]:
    gacha_list_coroutine = gacha_repo.all(
        session=session, order=order, size=size, page=page, search=search, pulled=pulled, user=user
    )
    table_temp = list[tuple[
        table.GachaTable,
        Coroutine[Any, Any, table.ThumbnailTable],
        Coroutine[Any, Any, table.LicenceTable]
    ]]()
    for gacha_table in await gacha_list_coroutine:
        table_temp.append((
            gacha_table,
            thumbnail_repo.by_gacha(session, gacha_table),
            licence_repo.by_gacha(session, gacha_table),
        ))
    gacha_list = list[data.GachaListRes]()
    for (gacha_table, thumbnail_coroutine, licence_coroutine) in table_temp:
        thumbnail_table: table.ThumbnailTable = await thumbnail_coroutine
        licence_table: table.LicenceTable = await licence_coroutine
        gacha_list.append(
            gacha_table.to_gacha_list_res(thumbnail_table.to_image_data(), licence_table.to_licence_data())
        )
    return gacha_list


@app.post("/api/gacha/{uid}/pull")
async def pull_gacha(
        uid: int,
        session: AsyncSession = Depends(get_session),
        user: table.UserTable = Depends(get_self_user),
) -> data.PullGachaRes:
    sources = await content_repo.all_by_non_pulled(session, uid, user)
    root_table = list[table.ContentTable]()
    for src in sources:
        for _ in range(src.rate):
            root_table.append(src)
    if len(root_table) == 0:
        raise ErrorIdException(ErrorIds.ALL_GACHA_PULLED)
    content = root_table[secrets.randbelow(len(root_table))]
    pulled = await pulled_repo.create(session, user, content, False)
    await session.commit()
    await session.refresh(pulled)

    return pulled.to_pull_gacha_res()


@app.get("/api/gacha/{gacha_id}/contents/{content_id}")
async def get_contents(
        gacha_id: int,
        content_id: int,
        session: AsyncSession = Depends(get_session),
        user: table.UserTable = Depends(get_self_user),
) -> data.GachaContentRes:
    content = await content_repo.by_gacha_and_uid_and__pulled_or_user(session, gacha_id, content_id, user)
    is_pulled = content_repo.is_content_pulled(session, content, user)
    gacha = gacha_repo.by_id(session, gacha_id)
    image = content_image_repo.by_content(session, content)
    image = await image
    gacha = await gacha
    is_pulled = await is_pulled
    return content.to_content_res(image.to_image_data(), is_pulled, gacha.user_id)
