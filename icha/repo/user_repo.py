from sqlalchemy.ext.asyncio import AsyncSession

from icha import data
from icha.table.table import UserTable


def current_user_or_none(self) -> UserTable | None:
    # user_id = get_jwt_identity()
    # if user_id is None:
    #     return None
    # return db.session.query(UserModel).filter(
    #     UserModel.id == user_id
    # ).first()
    pass


def current_user(self) -> UserTable:
    # user_model = UserRepository.current_user_or_none()
    # if user_model is None:
    #     raise ErrorIdException(ErrorIds.USER_NOT_FOUND)
    # return user_model
    pass


def create(session: AsyncSession, post_user: data.PostUserBody) -> UserTable:
    user = UserTable.create(post_user)
    session.add(user)
    return user
