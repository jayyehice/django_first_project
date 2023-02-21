# 在 Windows环境下使用virtualenv安装Django的完整步骤和命令


## 步骤1：安装virtualenv
打开命令行终端。
输入以下命令安装virtualenv：
```
pip install virtualenv
```
如果您使用的是Python 3，则可以使用以下命令：
```
pip3 install virtualenv
```
## 步骤2：创建并激活虚拟环境
在命令行中，转到您想要创建虚拟环境的目录。
输入以下命令创建一个名为“myenv”的虚拟环境：
```
virtualenv myenv
```
等待虚拟环境创建完成。
输入以下命令激活虚拟环境：
```
myenv\Scripts\activate
```
此命令将激活虚拟环境，您将看到命令行窗口前面出现了虚拟环境的名称，表示您现在正在该虚拟环境中工作。
## 步骤3：安装Django
确认已经激活了虚拟环境。
输入以下命令安装Django：
```
pip install django
```
如果您使用的是Python 3，则可以使用以下命令：
Copy code
pip3 install django
## 步骤4：创建Django项目
在命令行中，转到您想要创建Django项目的目录。
输入以下命令创建名为“myproject”的Django项目：
```
django-admin startproject myproject
```
此命令将创建一个名为“myproject”的目录，并在其中包含Django项目所需的文件和目录。
## 步骤5：运行Django项目
确认已经激活了虚拟环境，并且您正在Django项目的根目录中。
输入以下命令启动Django开发服务器：
```
python manage.py runserver
```
您将在命令行窗口中看到类似以下信息的输出：
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```
打开Web浏览器，并输入以下URL：
```
http://127.0.0.1:8000/
```
您将看到Django项目的默认欢迎页面。
## 步骤6：退出虚拟环境
在虚拟环境中工作时，只需在命令行中输入以下命令即可退出虚拟环境：

```
deactivate
```
此命令将还原环境变量和路径，使您回到原始的Python环境中。
