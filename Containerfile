FROM registry.access.redhat.com/ubi9/nginx-120
MAINTAINER Aly Ibrahim<aly.ibrahim@gmail.com>
ADD public/ .
ADD hathor-bank.conf $NGINX_DEFAULT_CONF_PATH
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
# Run script uses standard ways to run the application
CMD nginx -g "daemon off;"
