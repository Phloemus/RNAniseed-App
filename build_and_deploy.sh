#!/bin/bash

# Variable declaration
username=""
versionname=""
prefix="wa7al"
hostname="server.com"
password=""


# Analyse des paramètres en ligne de commande
while getopts "u:v:" option; do
  case $option in
    u) username=$OPTARG;;
    v) versionname=$OPTARG;;
    *) echo "Usage: $0 -u username -v versionname"; exit 1;;
  esac
done

# Verification of needed parameters
if [[ -z $username || -z $versionname ]]; then
  echo "Usage: $0 -u username -v versionname"
  exit 1
fi

# Building the front end (React JS)
#echo "Building ReactJS project"
#npm run build

# Collecting server connection credentials
echo "Deployment to ${prefix}.ftp.${hostname} with ${prefix}_${username} require user password"
echo "Enter your password: "
read -s password

echo "Connecting to ${prefix}.ftp.${hostname}.."

# Remove the files of the application for the selected version
sshpass -p "$password" ssh ${prefix}_${username}@${prefix}.ftp.${hostname} rm -rf ~/sites/gingembre.org/app/${version}

# Create an empty version folder
sshpass -p "$password" ssh ${prefix}_${username}@${prefix}.ftp.${hostname} mkdir ~/sites/gingembre.org/app/${version}

# Securly copy the build files to the remote server
sshpass -p "$password" scp build ${prefix}_${username}@${prefix}.ftp.${hostname}:~/sites/gingembre.org/app/${version}

# Move the build files out of the build directory (to the parent one)
sshpass -p "$password" ssh ${prefix}_${username}@${prefix}.ftp.${hostname} mv build/* .

# Remove the now empty build directory 
sshpass -p "$password" ssh ${prefix}_${username}@${prefix}.ftp.${hostname} rm -r build

# Success message
echo "Application deployed correctly"
echo "Check on the internet: gingembre.org/app/${version}"







