import os
from typing import Optional

import click
from flask.cli import with_appcontext, AppGroup
from flask_sqlalchemy.model import Model

from app import db


@click.command("init-database")
@with_appcontext
def init_database_cmd():
    init_database(None, None)


@click.command("reset-admin")
@with_appcontext
def reset_admin_cmd():
    admin: UserModel = db.session.select(UserModel).filter(
        UserModel.name == "admin"
    ).first()
    password = os.getenv("ADMIN_PASSWORD")
    if password is None:
        password = input("type password: ")
    admin.set_password(password)
    db.session.commit()


def init_database(password: Optional[str], email: str | None):
    admin_user = create_user("admin", password, email)
    db.session.commit()


def create_user(user_name: str, password: Optional[str], email: str | None):
    mdl = db.session.query(model.UserModel).filter(
        model.UserModel.name == user_name
    ).first()
    if mdl is not None:
        return mdl
    mdl = model.UserModel()
    mdl.name = user_name
    mdl.name_mei = "admin"
    mdl.name_sei = "admin"
    mdl.name_mei_kana = "admin"
    mdl.name_sei_kana = "admin"

    mdl.role_id = role.id
    mdl.company_id = company.id

    if password is None:
        password = os.getenv("ADMIN_PASSWORD")
    if password is None:
        password = input("type password: ")
    mdl.set_password(password)

    return create_model(mdl)


def create_company(company_name: str):
    mdl = db.session.query(model.CompanyModel).filter(
        model.CompanyModel.name == company_name
    ).first()
    if mdl is not None:
        return mdl
    mdl = model.CompanyModel()
    mdl.name = company_name
    return create_model(mdl)


def create_role(role_id: int, name: str):
    role = db.session.query(model.RoleModel).filter(
        model.RoleModel.id == role_id
    ).first()
    if role is not None:
        return role

    role = model.RoleModel()
    role.id = role_id
    role.name = name
    return create_model(role)


def create_model(mdl: Model):
    mdl.add_user = "system"
    mdl.update_user = "system"
    db.session.add(mdl)
    return mdl


job = AppGroup("job")
job.add_command(init_database_cmd)
job.add_command(reset_admin_cmd)
