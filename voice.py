import speech_recognition as sr

# Function to detect "hello" in speech
def detect_hello():
    # Initialize recognizer
    recognizer = sr.Recognizer()

    # Use default microphone as the audio source
    with sr.Microphone() as source:
        print("Listening...")
        while True:

            try:
                  # Adjust energy threshold based on ambient noise level
                  recognizer.adjust_for_ambient_noise(source)

                  # Capture audio from the microphone
                  audio_data = recognizer.listen(source)

                  # Recognize speech using Google Speech Recognition
                  text = recognizer.recognize_google(audio_data)
                  print(text)
                  
            except sr.UnknownValueError:
                  print("Sorry, could not understand audio.")
            except sr.RequestError as e:
                  print("Error fetching results from Google Speech Recognition service; {0}".format(e))

# Run the function to detect "hello" in speech
detect_hello()
