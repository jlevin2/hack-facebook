from django.db import models

# Create your models here.

class SentDocument(models.Model):
    page_id = models.CharField(max_length=256)
    score = models.DecimalField(decimal_places=6, max_digits=10)
    emotion = models.DecimalField(decimal_places=6, max_digits=10)

    def __str__(self):
        return self.page_id

    def as_dict(self):
        return dict({
            "page_id" : str(self.page_id),
            "score": str(self.score),
            "emotion": str(self.emotion)
        })