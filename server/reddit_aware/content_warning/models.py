from django.db import models

# Create your models here.

class CWDocument(models.Model):
    page_id = models.CharField(max_length=256)
    trigger_content = models.CharField(max_length=256)
    unsafe =  models.BooleanField(default=False)

    def __str__(self):
        return self.page_id


