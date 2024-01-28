from icha.tble.user_model import UserModel


class UserRepository:

    @staticmethod
    def current_user_or_none() -> UserModel | None:
        user_id = get_jwt_identity()
        if user_id is None:
            return None
        return db.session.query(UserModel).filter(
            UserModel.id == user_id
        ).first()

    @staticmethod
    def current_user() -> UserModel:
        user_model = UserRepository.current_user_or_none()
        if user_model is None:
            raise ErrorIdException(ErrorIds.USER_NOT_FOUND)
        return user_model
