FROM python:3

WORKDIR /code
RUN apt-get update -y
RUN apt-get install postgresql-client  -y
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["./script.sh"]