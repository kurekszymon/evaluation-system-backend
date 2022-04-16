FROM ubuntu:18.04

WORKDIR /app

RUN set -xe \
    && apt-get update \
    && apt-get install curl -y \
    # install specific python version, so genericpath.py can be replaced.
    && apt-get install python3.8 -y \
    && apt-get install python3.8-distutils -y

# install pip
RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py \
    && python3.8 get-pip.py

# install dependencies
COPY requirements.txt requirements.txt
RUN pip3 install --upgrade pip \
    && pip3 install -r requirements.txt

# install required libs
RUN apt-get install poppler-utils -y

# replace genericpath.py
COPY genericpath.py /usr/lib/python3.8/genericpath.py
COPY . .

EXPOSE 5000

ENTRYPOINT [ "python3.8" ]
CMD [ "app.py" ]

# heroku stack:set container # to change stack of the app hosted on heroku