FROM php:8.1.6-fpm

RUN apt-get update

# mcrypt
RUN apt install -y libmcrypt-dev
RUN pecl install mcrypt

# other php modules
RUN apt install -y libzip-dev
RUN docker-php-ext-configure zip
RUN apt install -y libbz2-dev librabbitmq-dev libpng-dev libxml2-dev libgmp-dev freetds-dev

# RUN docker-php-ext-install -j$(nproc)

RUN docker-php-ext-install bcmath
RUN docker-php-ext-install bz2
RUN docker-php-ext-install calendar
RUN docker-php-ext-install exif
RUN docker-php-ext-install gd
RUN docker-php-ext-install gettext
RUN docker-php-ext-install gmp
RUN docker-php-ext-install intl
RUN docker-php-ext-install mysqli
RUN docker-php-ext-install opcache
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install pdo_dblib
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install shmop
RUN docker-php-ext-install soap
RUN docker-php-ext-install sockets
RUN docker-php-ext-install sysvmsg
RUN docker-php-ext-install sysvsem
RUN docker-php-ext-install sysvshm
RUN docker-php-ext-install zip

RUN echo '' | pecl install amqp
RUN echo '' | pecl install redis
RUN pecl igbinary
RUN pecl install igbinary 

RUN docker-php-ext-configure intl
RUN docker-php-ext-enable amqp
RUN docker-php-ext-enable igbinary 
RUN docker-php-ext-enable redis

RUN apt install -y iputils-ping

# write php logs to file instead of stdout
RUN mkdir /var/log/php-fpm/ \
    && cd /usr/local/etc/php-fpm.d \
    && { \
            echo '[global]'; \
            echo 'error_log = /var/log/php-fpm/error.log'; \
            echo; \
            echo '[www]'; \
            echo 'access.log = /var/log/php-fpm/access.log'; \
        } | tee -a docker.conf

RUN apt-get -y install git

# download and install composer
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

CMD [ "php-fpm" ]