# ActiStack
ActiStack is an android app that helps you get organized, despite not having a regular sleep schedule.
It was built using React Native.

# How to use the app
You can input activities with or without duration and use them to plan your day. After inserting your first activity into your plan, you can stack further by inserting at the top or bottom. Use the arrow in the header bar to switch direction.

# Installation
For easy install, use the already built .apk file.
To build your own, use the following commands:
```
yarn install
cd android
./gradlew assembleRelease
open './app/build/outputs/apk/release/'
```

# How to develop
To use the development version, you have to install adb and connect your phone via USB. Activate USB-Debugging and accept the request to install the app when prompted.
You can get the ID of your device by running:
```
adb devices
```
To build the development apk, install it on your phone and run the Metro Bundler for live update, run:
```
yarn android
```
To only build and install the development apk, run:
```
cd android
./gradlew assembleDebug
adb -s <your-device-id> reverse tcp:8081 tcp:8081
adb -s <your-device-id> install app/build/outputs/apk/debug/app-debug.apk
```
