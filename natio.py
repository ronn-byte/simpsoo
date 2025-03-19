import cv2
import numpy as np
import os
import random 
import qrcode
from PIL import Image, ImageDraw, ImageFont

#Print current working direcory 
print("current working directory: ", os.getcwd())

#Check if files exist in the working directory
print("Files in the current directory: ", os.listdir())

# Try to create a blank image for testing 
id_card = np.ones((850, 550, 3), dtype=np.uint8) * 255 # White background

# Try to load background or use a colored backgroundif not available
try:
    bg_texture = cv2.imread("id_bg.jpg")
    if bg_texture is None:
        print("Creating placeholder background")
        bg_texture = np.ones((850, 550, 3), dtype=np.uint8) * [240, 240, 240] #Light gray
except:
    print("Creating placeholder background")
    bg_texture = np.ones((850, 550, 3), dtype=np.uint8) * [240, 240, 240] # Light gray
    
    # Resize background and blend with ID  card
    

#set ID card dimensions
width, height =900, 600
id_card = np.ones((height, width, 3),
dtype=np.uint8) * 255 # whitebackground

#load Background Texture (Optional: You can add pattern)
bg_texture = cv2.imread("id_bd.jpg")  #Replace with a textured image

if bg_texture is not None:
    bg_texture = cv2.resize(bg_texture, (width, height))
    id_card = cv2.addWeighted(id_card, 0.8, bg_texture, 0.2, 0)
    
    #load Passport photo
photo_path = "/Users/ronni/OneDrive/Pictures/3f7c172bd5377835beff7e7715383948.jpg"

try:
    photo = cv2.imread(photo_path)
    photo = cv2.resize(photo, (150, 180))
    
    #Resize to fit ID space
    id_card[80:260, 700:850] = photo
    
except Exception as e:
    print("Error loading or processing image:", e)
    cv2.putText(id_card, "No photo", (50, 50),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
    
    #Generate Fake Details
    
name = " Kipkirui Boniface"
id_number = f"{random.randint(10000000, 99999999)}"
dob = "02-07-1982"
gender = "Male"
county = "Kericho"
serial_no = f"SN-{random.randint(100000, 999999)}"
    
    #Generate QR Code
    
qr_data = f"ID: {id_number}\nName: {name}\nDOB: {dob}\nGender: {gender}\nCounty: {county}"
qr =qrcode.make(qr_data)
qr = qr.resize((100, 100))
qr.save("qr_code.png")
qr_img = cv2.imread("qr_code.png")
id_card[450:550, 50:150] = qr_img #insert qr code
    
    #Load watermark (Government Seal)
    
watermark_path = "watermark.png"
try:
        watermark = cv2.imread(watermark_path, cv2.IMREAD_UNCHANGED)
        watermark = cv2.resize(watermark, (200, 200))
        
        x_offset, y_offset = 350, 200 #position of watermark
        
        for c in range(0, 3): #Apply transaparent effect 
            id_card[y_offset + watermark.shape [0], x_offset:x_offset + watermark.shape[1], c] = (
                id_card[y_offset:y_offset + watermark.shape [0], x_offset:x_offset + watermark.shape[1], c] *(1 - 0.3) + watermark[:, :, c] * 0.3
            )
            
except: 
        cv2.putText(id_card, "No Watermark", (370, 280), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (200, 200, 200), 2)
        
        #Use PIL for better fonts
        
        id_pil = Image.fromarray(id_card)
        draw = ImageDraw.Draw(id_pil)
        font = ImageFont.load_default()
        
        #Draw Text Fields
        
        details = [
            ("REPUBLIC OF KENYA", 50, 30, (0, 0, 255)), #RED 
            ("NATIONAL IDENTITY CARD", 50, 70, (0, 0, 0)),
            (f"ID No: {id_number}", 50, 130, (0, 0, 0)),
            (f"Name: {name}", 50, 180, (0, 0, 0)),
            (f"DOB: {dob}", 50,230, (0, 0, 0)),
            (f"County: {county}", 50, 330, (0, 0, 0)),
            (f"Serial No: {serial_no}", 50, 430, (0,0,255)), 
        ]
        
        for text, x, y, color in details:
            draw.text((x, y), text, font=font, fill=color)
            
            #Load and insert signature
            
            signature_path = "signature.png"
            try:
                signature = cv2.imread(signature_path, cv2.IMREAD_UNCHANGED)
                signature =cv2.resize(signature, (180, 50))
                id_card[500:550, 600:780] = signature #insert at bottom right
                
            except:
                draw.text((620, 530), "Signature", font=font, fill=(0, 0, 0))
                
                #convert back to OpenCV format
                id_card = np.array(id_pil)
                
                #Display the ID card
                cv2.imshow("Mock Kenya National ID", id_card)
                cv2.waitKey(0)
                cv2.destroyAllWindows()