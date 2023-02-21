# django_first_project

在 virtualenv 上安装 Django 是一种很好的方式，因为它允许您在独立于系统的Python环境中运行Django应用程序。以下是安装Django的步骤：

首先，创建一个新的虚拟环境。在命令行中输入以下命令：

Copy code
virtualenv myenv
这将在当前目录中创建一个名为myenv的新虚拟环境。您可以选择使用其他名称。

激活虚拟环境。在Linux或macOS上，可以使用以下命令：

bash
Copy code
source myenv/bin/activate
在Windows上，可以使用以下命令：

Copy code
myenv\Scripts\activate
现在，您可以在虚拟环境中安装Django。在命令行中输入以下命令：

Copy code
pip install django
这将使用pip安装最新版本的Django。

安装完成后，您可以创建一个新的Django项目。在命令行中输入以下命令：

Copy code
django-admin startproject myproject
这将在当前目录中创建一个名为myproject的新Django项目。您可以选择使用其他名称。

最后，运行以下命令来检查Django是否正确安装并正常运行：

Copy code
python manage.py runserver
这将启动Django开发服务器。您可以在Web浏览器中打开http://127.0.0.1:8000/来访问您的Django应用程序。

记得在完成后，您可以使用deactivate命令停用虚拟环境，以退出虚拟环境并返回到系统Python环境中。
