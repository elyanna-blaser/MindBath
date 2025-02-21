void setup()
{
Serial.begin(9600); //Open the serial to set the baud rate for 9600bps
}
void loop()
{
// int val;
int val1=analogRead(A0); //Connect the analog piezoelectric ceramic vibration sensor to analog interface A0
int val2=analogRead(A1); //Connect the analog piezoelectric ceramic vibration sensor to analog interface A1

// Serial.print("Vibration is ");
Serial.print(val1,DEC);
Serial.print(",");
Serial.println(val2,DEC);//Print the analog value read via serial port
delay(100);
}
