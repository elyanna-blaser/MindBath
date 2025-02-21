// declare constant variables for pins
const int micpin1 = A1;
const int micpin2 = A2;

int mic1; // variable for micpin1 analogRead
int mic2; // variable for micpin2 analogRead
int amplitude1; // variable for micpin1 amplitude
int amplitude2; // variable for micpin2 amplitude


// mic is powered from 3.3V,
// output will be centered at 1.65v, which will be
// an analogRead value of 1.65*1023 = 337
const int baseline = 337;
// int amplitude; //difference between mic reading and baseline

void setup() {

  Serial.begin(9600);
}
void loop() {
  mic1 = analogRead(micpin1);
  mic2 = analogRead(micpin2);
  amplitude1 = abs(mic1 - baseline);
  amplitude2 = abs(mic2 - baseline);
  // int sensorCondition = 0; // Replace with logic for determining condition (0 or 1)
  // Serial.print(sensorCondition);
  // Serial.print(amplitude1);
  // Serial.print(",");
  Serial.println(amplitude2);
  // Serial.write(sensorCondition);
  // Serial.write(amplitude);
  delay(200);
}