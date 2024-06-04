from django.contrib.auth import logout as my_logout
from django.http import HttpResponseBadRequest
from UserManagement.models import UserPro 
from django.shortcuts import  redirect
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt

def login_required(request):
    access_token = request.session.get('user_id')
    try:
        user = UserPro.objects.get(id=access_token)
    except UserPro.DoesNotExist:
        return None
    return user
   
def logout(request):
    my_logout(request)
    request.session.set_expiry(0)
    return redirect('/login/')

def exit():
    return redirect('/game/')


def get_session(request):
    user = login_required(request)
    if not user:
        return HttpResponseBadRequest("Forbidden", status=403)
    user_id = request.session.get('user_id')
    token = request.session.get('token')
    contex = {'user_id': user_id, 'token': token}
    return JsonResponse(contex)

@csrf_exempt
def csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})