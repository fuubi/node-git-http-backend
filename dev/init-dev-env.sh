git init --bare test.git

cd test.git

# git-update-server-info
# --------------------------
# Update auxiliary info file to help dumb servers
# see https://git-scm.com/docs/git-update-server-info
git update-server-info

# git http.receivepack
# --------------------------
# This serves git send-pack clients, allowing push.
# It is disabled by default for anonymous users, and
# enabled by default for users authenticated by the web server.
# It can be disabled by setting this item to false,
# or enabled for all users, including
# anonymous users, by setting it to true
# see https://git-scm.com/docs/git-http-backend
git config http.receivepack true

cd ..
