from typing import Any, Coroutine

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app import app
from icha import data, tokens, table
from icha.data import LoginRes, TokensRes
from icha.error import ErrorIdException, ErrorIds
from icha.repo import user_repo, gacha_repo, thumbnail_repo, licence_repo, content_repo
from icha.table import get_session, UserTable
from icha.tokens import get_token, get_user


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


@app.get("/api/user/self")
async def get_self_user(
        user: Coroutine[Any, Any, UserTable] = Depends(get_user),
) -> data.UserRes:
    return await user


@app.post("/api/gacha")
async def create_gacha(
        body: data.GachaBody,
        session: AsyncSession = Depends(get_session),
        user: Coroutine[Any, Any, UserTable] = Depends(get_user),
) -> data.GachaRes:
    gacha = gacha_repo.create_gacha(session, body, await user)
    await session.flush([gacha])
    licence = licence_repo.create(session, body.licence, gacha)
    thumbnail = thumbnail_repo.create(session, body.thumbnail, gacha)

    content_tables = list[tuple[table.GachaContentTable, data.GachaContentBody]]()
    for content_data in body.contents:
        content_table = content_repo.create(session, content_data, gacha)
        content_tables.append((content_table, content_data))
    contents_tuples = list[tuple[table.GachaContentTable, table.GachaContentImageTable]]()
    for (content_table, content_data) in content_tables:
        await session.flush([content_table])
        content_image = gacha_repo.create_image(session, content_data.image, content_table)
        contents_tuples.append((content_table, content_image))

    commit = session.commit()
    gacha_refresh = session.refresh(gacha)
    thumbnail_refresh = session.refresh(thumbnail)
    licence_refresh = session.refresh(licence)
    content_refreshes = list[Coroutine]()
    for (content_table, content_image) in contents_tuples:
        content_refreshes.append(session.refresh(content_table))
        content_refreshes.append(session.refresh(content_image))
    await commit
    await gacha_refresh
    await thumbnail_refresh
    await licence_refresh
    for content_refresh in content_refreshes:
        await content_refresh
    contents = list[data.GachaContentRes]()
    for (content_table, content_image) in contents_tuples:
        content_table: table.GachaContentTable
        content_image: table.GachaContentImageTable
        contents.append(content_table.to_content_res(content_image.to_image_data()))
    return gacha.to_gacha_res(thumbnail.to_image_data(), licence.to_licence_data(), contents)


@app.get("/api/gacha/{uid}")
async def get_gacha(
        uid: int,
        session: AsyncSession = Depends(get_session),
) -> data.GachaRes:
    gacha_coroutine = gacha_repo.by_id(session, uid)
    gacha = await gacha_coroutine
    thumbnail_coroutine = thumbnail_repo.by_gacha(session, gacha)
    licence_coroutine = licence_repo.by_gacha(session, gacha)
    content_tables_coroutine = content_repo.all_with_image_by_gacha(session, gacha)
    contents = list[data.GachaContentRes]()
    thumbnail = await  thumbnail_coroutine
    for (content, image) in await content_tables_coroutine:
        content: table.GachaContentTable
        image: table.GachaContentImageTable
        contents.append(content.to_content_res(image.to_image_data()))
    licence = await  licence_coroutine
    return gacha.to_gacha_res(thumbnail.to_image_data(), licence.to_licence_data(), contents)
