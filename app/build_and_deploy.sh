#!/bin/bash

# Variable declaration
username=""
hostname="194.57.116.101"
password=""


# Analyse des paramètres en ligne de commande
while getopts "u:" option; do
  case $option in
    u) username=$OPTARG;;
    *) echo "Usage: $0 -u username"; exit 1;;
  esac
done

# Verification of needed parameters
if [[ -z $username ]]; then
  echo "Usage: $0 -u username"
  exit 1
fi

# Display info about the connection method used
echo "Deployment to ${hostname} via ssh using ssh keys"

# Asking for account sudo password
echo "App deployment needs priviledge authorizations. Require password for ${username}"
echo "Enter your password: "
read -s password

# Check if the password is good
ssh ${username}@${hostname} "echo '$password' | sudo -S whoami"

if [ $? -eq 0 ]; then

  ## ? Case of a correct password 

  # Building the front end (React JS)
  echo "Building ReactJS project"
  npm run build

  echo "Connecting to ${hostname}.."

  # Remove the files of the application for the selected version
  ssh ${username}@${hostname} "echo '$password' | sudo -S rm -rf /var/www/html/cellxgene/app"

  # Create an empty version folder
  ssh ${username}@${hostname} "echo '$password' | sudo -S mkdir /var/www/html/cellxgene/app"

  # Securly copy the build files to the remote server (in tmp repo)
  echo "Build Files are being transfered to remote server.."
  scp -r build ${username}@${hostname}:/tmp

  # Move the build to apache route
  ssh ${username}@${hostname} "echo '$password' | sudo -S mv /tmp/build/* /var/www/html/cellxgene/app/"

  # Remove the temp/build now empty directory
  ssh ${username}@${hostname} "echo '$password' | sudo -S rm -r /tmp/build/"

  # Success message
  echo "Application deployed correctly on remote server"

else

  ##? Case of a wrong password

  echo "Unable to connect to ${hostname} with ${username} via ssh using the existing ssh key"
  echo "Exiting without building app"

fi