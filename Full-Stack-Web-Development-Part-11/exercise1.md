1.	For process in CI setup using Python language, we have tools to help us do that.
+ For linting, we can use Pylint
+ For testing, we can use unittest.mock, PyTest, Robot.
+ For building, first, we need a file “requirements.txt” for dependency management, a setup.py file to define metadata and dependencies, and then build using setuptools.

2.	Besides Jenkin and Github Actions, we have some alternatives for example: 
+ Buddy: https://buddy.works/ 
+ Jira Software: https://www.atlassian.com/software/jira
+ Final Builder

3.	It depends largely on the scale of the project.
If the project is small to medium, doesn’t have any special requirements, a cloud-based solution (GitHub actions) will probably the best choice. The configuration is simple and you don't need to go to the hassle or expense of setting up your own system. For smaller projects especially, this should be cheaper.

For larger projects where more resources are needed or in larger companies where there are multiple teams and projects to take advantage of it, a self-hosted CI setup is probably the way to go.
