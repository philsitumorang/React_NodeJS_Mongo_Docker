# FROM mongo:3.6
FROM mongo:6.0.2-focal

# RUN /bin/sh -c "apt install bash"
# RUN /bin/sh -c "apt install nano"
# RUN apt install bash
# RUN apt install nano

# Auth Configuration. Modify as needed.
# These environment variables can also be specified through command line or docker-compose configuration
ENV AUTH yes

ADD ./run.sh /run.sh
ADD ./set_mongodb_password.sh /set_mongodb_password.sh

RUN chmod +x /run.sh
RUN chmod +x /set_mongodb_password.sh

CMD ["/run.sh"]