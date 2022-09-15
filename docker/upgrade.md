### Create the docker env file
- `cd docker`
- `cp .env.example .env`

### Copy the latest local.env from env repo:
- http://tree.mn/cm/cm-env/-/blob/master/empire/local.env

### Configuring the hostname
1. Linux users:
- assign an IP address to the nginx container
- create an entry in your hosts file to resolve your desired domain to this IP.

2. Mac users (linux users can also use this method):
- add an entry in your hosts file that resolves your desired domain to `127.0.0.1`.
- configure a reverse proxy on your local machine that forwards traffic received port 80 for given domain to the running docker container. (A sample config is provided in `/docker/setup` folder).

### Setting up mnet-scripts
- setup the `mnet-scripts` by following the instructions on the repository(http://tree.mn/cm-hb/mnet-scripts).


### (Optional) To override the defaults
1. To override the docker-compose setup
-  create a `docker-compose.override.yml` file in /docker folder
-  write the config you want to add/override such that it follows the same structure as `docker-compose.yml`