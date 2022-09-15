FROM harbor-adc.internal.media.net/cm/admin-interface/phpfpm-base:8.1.6.v1
RUN apt install -y supervisor cron

# cron
COPY supervisor/crons /etc/cron.d
RUN chmod 0644 /etc/cron.d/stage

# supervisor
COPY supervisor/supervisor.conf /etc/supervisor/conf.d/supervisord.conf
COPY supervisor/horizon.conf /etc/supervisor/conf.d/horizon.conf

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]