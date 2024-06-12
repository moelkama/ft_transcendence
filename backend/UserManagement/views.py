from django.shortcuts import render, redirect
from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.forms import UserChangeForm, UserChangeForm
from .forms import UserForm, Userchange
from django.contrib import messages
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from rest_framework.authtoken.models import Token


def LoginPage(request):
    if (request.user.is_authenticated == True):
        messages.warning(request, "you are already login")
        return redirect('viewProfile')
    return render(request, "UserManagement/loginPage.html", {'form' : UserForm()})

from django.http import JsonResponse

def ViewProfile(request):
    if (request.user.is_authenticated == True):
        return redirect("/home/")
    else:
        return redirect('/SignIn/')
    
def LoginUser(request):
    if request.user.is_authenticated:
        return JsonResponse({'alert': 'ok', 'redirect_url': '/home/'}, status=200)
    
    if request.method == 'POST':
        username_enter = request.POST.get('username')
        password_enter = request.POST.get('password')
        user_login = authenticate(username=username_enter, password=password_enter)
        
        if user_login is not None:
            user_profile = UserPro.objects.get(user=user_login)
            token = Token.objects.get(user=user_login)
            request.session['user_id'] = user_profile.id
            request.session['token'] = token.key
            login(request, user_login)
            return JsonResponse({'alert': 'ok', 'redirect_url': '/home/'}, status=200)
        else:
            return JsonResponse({'alert': 'Username or Password is incorrect'}, status=401)
    
def RegisterUser(request):
    if (request.method == "POST"):
        new_user = UserForm(request.POST)
        _user_profile = UserPro()
        # user_friends = UserFriend()
        if (new_user.is_valid() == True):
            new_user = new_user.save()
            token = Token.objects.create(user=new_user)
            _user_profile.user = new_user
            if (request.FILES.get('photo_profile')):
                _user_profile.photo_profile = request.FILES.get('photo_profile')
            _user_profile.username = new_user.username
            _user_profile.first_name = new_user.first_name
            _user_profile.last_name = new_user.last_name
            _user_profile = _user_profile.save()
            return redirect('/SignIn/')
        else :
            return JsonResponse({"error":new_user.errors})
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# @login_required(login_url='loginUser')  
# def SendRequest(request):
#     if (request.method == "POST"):
#         suggestion_friend = User.objects.get(
#         username=request.POST.get('username')
#             )
#         if UserFriend.objects.filter(user=request.user, friend=suggestion_friend).exists() == False:
#             request_user = Request_friend(
#                 request_user=request.user,
#                 user_suggestion=suggestion_friend,
#                 )
#             if Request_friend.objects.filter(request_user=request.user, 
#                 user_suggestion=suggestion_friend).exists() == False and Request_friend.objects.filter( request_user=suggestion_friend, 
#                         user_suggestion=request.user).exists() == False:
#                 request_user.save()
#     return redirect('viewProfile')

# @login_required(login_url='loginUser')  
# def addUser_As_Friend(request):
#     if (request.method == "POST"):
#         _friend = User.objects.get(username=request.POST.get('username')) 
#         if (Request_friend.objects.filter(request_user=_friend, 
#                 user_suggestion=request.user).exists() == True 
#                 and UserFriend.objects.filter(user=request.user, friend=_friend).exists() == False) :
#             user_friend = UserFriend(user=request.user, friend=_friend)
#             user_friend.save()
#             UserFriend(user=_friend, friend=request.user).save()
#             Request_friend.objects.filter(request_user=_friend, 
#                 user_suggestion=request.user).delete()
#     return redirect('viewProfile')

# @login_required(login_url='loginUser')  
# def delete_requestFriend(request):
#     request_friend = User.objects.get(username=request.POST.get('username'))
#     _request = Request_friend.objects.filter(request_user=request_friend, 
#             user_suggestion=request.user)
#     if (_request.exists() == True):
#         _request.delete()
#     return redirect('viewProfile')

# @login_required(login_url='loginUser')  
# def unfriend_user(request):
#     _friend = User.objects.get(username=request.POST.get('username'))
#     relation = UserFriend.objects.filter(user=request.user,friend=_friend)
#     if (relation.exists() == True):
#         relation.delete()
#         relation = UserFriend.objects.filter(user=_friend,friend=request.user)
#         if (relation.exists() == True):
#             relation.delete()
#     return redirect('viewProfile')


