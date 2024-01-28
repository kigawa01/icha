from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Mapped

from icha.table.table import BaseTable


class UserModel(BaseTable):
    __tablename__ = "user"
    uid: Mapped[int] = Column(Integer, primary_key=True, name="id", autoincrement=True)
    name: Mapped[str] = Column(String(32), nullable=False)
    email: Mapped[str] = Column(String(32), nullable=False, unique=True)
    password: Mapped[str] = Column(String(128), nullable=False)
    #
    # def apply_body(self, user_body: UserBody):
    #     self.name = user_body.name
    #     self.email = user_body.email
    #     self.set_password(user_body.password)
    #
    # @staticmethod
    # def create(body: UserBody):
    #     model = UserModel()
    #     if body.password == "":
    #         raise ErrorIdException(ErrorIds.TOKEN_EXPIRED)
    #     model.apply_body(body)
    #     return model
    #
    # def set_password(self, password: str):
    #     # noinspection PyTypeChecker
    #     self.password = Hash.hash(password)
    #
    # def check_password(self, password: str):
    #     return self.password == Hash.hash(password)
