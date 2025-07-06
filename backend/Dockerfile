FROM python:3

ENV app_name='g4m_api'

WORKDIR /app

ADD . /app

COPY ./requirements.txt /app/requirements.txt

RUN pipenv install -r requirements.txt