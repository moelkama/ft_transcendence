from django.contrib.auth import logout as log
from django.http import HttpResponseBadRequest
from UserManagement.models import UserPro 
from django.shortcuts import  redirect
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from . serializers import TaskSerializer

def login_required(request):
    access_token = request.session.get('user_id')
    try:
        user = UserPro.objects.get(id=access_token)
    except UserPro.DoesNotExist:
        return None
    return user
   
def logout(request):
    log(request)
    return redirect('/')

def exit():
    return redirect('/game/')

def data(request):
    user = login_required(request)
    if not user:
        return HttpResponseBadRequest("Forbidden", status=403)
    dataseriaser = TaskSerializer(user)
    return JsonResponse(dataseriaser.data)

def token(request):
    user = login_required(request)
    if not user:
        return HttpResponseBadRequest("Forbidden", status=403)
    token = request.session.get('token')
    contex = {'token': token}
    return JsonResponse(contex)

def update_profile(request):
    if request.method == 'POST':
        user = login_required(request)
        user.photo_profile = request.FILES.get('image')
        print(user.photo_profile)
        user.save()
    return redirect('/profile/')

def update_username(request):
    if request.method == 'POST':
        user = login_required(request)
        user.username = request.POST.get('username')
        user.save()
    return redirect('/profile/')

@csrf_exempt
def csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})