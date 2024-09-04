from django.http import HttpResponse
import os

def get_homepage_view(request):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    
    image_path = os.path.join(current_directory, 'homepageBackground.jpg')
    
    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()
    
    return HttpResponse(image_data, content_type='image/jpeg')
