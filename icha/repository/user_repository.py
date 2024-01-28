from icha.table.user_table import UserTable


class UserRepository:

    @staticmethod
    def current_user_or_none() -> UserTable | None:
        # user_id = get_jwt_identity()
        # if user_id is None:
        #     return None
        # return db.session.query(UserModel).filter(
        #     UserModel.id == user_id
        # ).first()
        pass

    @staticmethod
    def current_user() -> UserTable:
        # user_model = UserRepository.current_user_or_none()
        # if user_model is None:
        #     raise ErrorIdException(ErrorIds.USER_NOT_FOUND)
        # return user_model
        pass
