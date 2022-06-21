#include <ArduinoJson.h>
#include <PubSubClient.h>
#include <ESP8266WiFi.h>        // Include the Wi-Fi library
#include <stdlib.h>
#include <LittleFS.h>

const char* ssid     = "Tai 2.4G";         // The SSID (name) of the Wi-Fi network you want to connect to
const char* password = "23456789@";     // The password of the Wi-Fi network
#define mqtt_server "broker.hivemq.com"
#define port 1883
#define send_topic "/topic/qos2303/warning"
#define receive_topic "/topic/qos2303/receive"
#define test_topic "/topic/qos2303/test"

unsigned long previousMillis = 0;
const long interval = 5000;

WiFiClient wifiClient;
PubSubClient client(wifiClient);

void setup_Wifi () {
  Serial.println("Connecting to \n");
  Serial.println("ssid");
  
  WiFi.begin(ssid, password);             // Connect to the network
  int i = 0;
  while (WiFi.status() != WL_CONNECTED) { // Wait for the Wi-Fi to connect
    delay(1000);
    Serial.print(++i); Serial.print(' ');
  }

  Serial.println('\n');
  Serial.println("Connection established!");  
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());  
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  //  hight led ....
  //  ...
  //  ...
}

void connect_to_broker() {
  Serial.print("connect to hiveMQ");
  Serial.println('\n');
  while(!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement…
      client.publish(test_topic, "hello world");
      // ... and resubcribe
      client.subscribe(receive_topic);       
    } else {
      Serial.print("connect hivemq failed, rc = ");
      Serial.print(client.state());
      Serial.println("try again before retrying 5s");
      //  wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  delay(500);
  setup_Wifi();

  client.setServer(mqtt_server, port);
  client.setCallback(callback);
  connect_to_broker();

  Serial.print("start transfer");
  
}

void loop() {
  delay(1000);
  if (!client.connected()) {
    connect_to_broker();
  }
  client.loop();
  DynamicJsonDocument docA0(1024);
  float ppm_co = analogRead(A0);
  docA0["name"] = "ESP8266_MQ7";
  docA0["typeSensor"] = "CO";
  docA0["data"] = ppm_co;
  char buffer[256];
  serializeJson(docA0, buffer);
  if (client.publish(send_topic, buffer)) {
    Serial.println("publish data success !");
  } else {
    Serial.println("publish data failed !");
  }
  if (isnan(ppm_co)) {
      Serial.print("failed to read from mq-7 sensor !");
  } else {
      Serial.print("Value Analog: ");
      Serial.print(ppm_co);
      Serial.print("\n");
  }
  delay(10000);
}





 
