echo "Enter release version: "

read VERSION

npm version $VERSION

npm publish

git push origin v$VERSION
