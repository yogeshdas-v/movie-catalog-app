FROM harbor-adc.internal.media.net/cm/admin-interface/phpfpm-base:8.1.6.v1

# Copy custom php config (prod)
COPY php/php.ini /usr/local/etc/php/php.ini

CMD [ "php-fpm" ]