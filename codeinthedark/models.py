from django.db import models
from uuid import uuid4
import random
from django.contrib.auth.models import User
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from time import sleep
from datetime import datetime
from django.conf import settings
from django.core.files import File


def generate_room_code():
    return '%016x' % random.randrange(16 ** 16)


# Create your models here.
class Room(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    contestants = models.ManyToManyField('Contestant', blank=True, null=True)
    max_contestants = models.IntegerField()
    time_limit = models.IntegerField()
    code = models.CharField(default=generate_room_code, max_length=1024)
    completed = models.BooleanField(default=False)
    start_time = models.DateTimeField(blank=True, null=True)
    website = models.CharField(max_length=255, blank=True, null=True)
    website_image = models.FileField(upload_to='websites/', blank=True, null=True)
    mobile_version = models.BooleanField(default=False)


    def save(self, *args, **kwargs):
        if not self.website_image:
            import io, os

            options = webdriver.ChromeOptions()
            options.add_argument("download.default_directory=%s" % settings.MEDIA_ROOT)
            options.headless = True
            driver = webdriver.Chrome(options=options)

            driver.get(self.website)

            S = lambda X: driver.execute_script('return document.body.parentNode.scroll'+X)
            if not self.mobile_version:
                driver.set_window_size(1920,S('Height')) # May need manual adjustment      
            else:
                driver.set_window_size(480,S('Height')) # May need manual adjustment      
            # file = driver.find_element_by_tag_name('body').screenshot('web_screenshot.png')
            date = datetime.now().date()
            driver.save_screenshot('%s/%s_%s.png' % (settings.MEDIA_ROOT, self.id, date) )
            driver.quit()

            img_bytes = open('%s/%s_%s.png' % (settings.MEDIA_ROOT, self.id, date ), 'rb')
            self.website_image.save('%s_%s.png' % (self.id, date), 
                File(img_bytes),
                save=False)

            os.remove('%s/%s_%s.png' % (settings.MEDIA_ROOT, self.id, date) )
        super().save(*args, **kwargs)




class Contestant(models.Model):
    username = models.CharField(max_length=64)
    ip = models.CharField(max_length=64)

    def __str__(self):
        return self.username
