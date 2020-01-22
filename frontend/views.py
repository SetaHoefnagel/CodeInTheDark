from django.shortcuts import render
from django.views.generic import View
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect

import os

# Create your views here.
class IndexView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'frontend/index.html')
        # try:
        #     with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
        #         return HttpResponse(f.read())
        # except FileNotFoundError:
        #     return HttpResponseRedirect('http://localhost:3000/')
