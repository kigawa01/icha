from sqlalchemy.ext.asyncio import AsyncSession

from icha import data, table

YES_STR = "Yes"
NO_STR = "No"


def str_boll_to_str(src: str | bool):
    if isinstance(src, str):
        return src
    elif src:
        return YES_STR
    else:
        return NO_STR


def str_to_str_bool(src: str):
    if src == YES_STR:
        return True
    elif src == NO_STR:
        return False
    else:
        return src


def create_gacha(session: AsyncSession, gacha_body: data.GachaBody, user: table.UserTable):
    gacha = table.GachaTable()
    gacha.user_id = user.uid
    gacha.name = gacha_body.name
    gacha.description = gacha_body.description
    session.add(gacha)
    return gacha


def create_thumbnail(session: AsyncSession, thumbnail_data: data.ImageData, gacha: table.GachaTable):
    thumbnail = table.ThumbnailTable()
    thumbnail.gacha_id = gacha.uid
    thumbnail.name = thumbnail_data.name
    thumbnail.base64 = thumbnail_data.base64
    session.add(thumbnail)
    return thumbnail


def create_licence(session: AsyncSession, licence_data: data.LicenceData, gacha: table.GachaTable):
    licence = table.LicenceTable()
    licence.gacha_id = gacha.uid
    licence.text = licence_data.text
    licence.business = str_boll_to_str(licence_data.business)
    licence.post = str_boll_to_str(licence_data.post)
    licence.credit = str_boll_to_str(licence_data.credit)
    licence.distribution = str_boll_to_str(licence_data.distribution)
    licence.material = str_boll_to_str(licence_data.material)
    session.add(licence)
    return licence


def create_content(session: AsyncSession, content_data: data.GachaContentBody, gacha: table.GachaTable):
    content = table.GachaContentTable()
    content.gacha_id = gacha.uid
    content.title = content_data.title
    content.description = content_data.description
    content.rate = content_data.rate
    session.add(content)
    return content


def create_image(session: AsyncSession, image_data: data.ImageData, content: table.GachaContentTable):
    image = table.GachaContentImageTable()
    image.content_id = content.uid
    image.name = image_data.name
    image.base64 = image_data.base64
    session.add(image)
    return image
