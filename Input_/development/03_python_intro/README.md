# Python Introduction

Simple and quick HOW-TO on **Python Best Practices**.

## PIP

Pip (Pip Installs Packages) is a package management system used to install and manage software packages written in Python. To install a package we can simply used command **pip install**:

    pip install PACKAGE_NAME

This command will install on our computer the _requests_ package. After the installation we'll available to use the package inside our scripts importing the external libraries (how? see below!).

From terminal, try **pip --help** to see what can you do with PIP!

## Virtual Environments

VirtualEnv is a Python tool to keep the dependencies required by different projects in separated places. Is solves the "Project X depends on version 1.x but, Project Y needs 4.x" dilemma, and keeps your global site-packages directory clean and manageable.

We'll use a separated virtual environment for each project, keeping separated the different packages installed.

How to install virtualenv:

    pip install virtualenv

To create a virtualenv:

    virtualenv ENV-NAME

After the creation, we have to activate our virtualenv:

    source ENV-NAME/bin/activate

Be careful! If the virtualenv is active we'll see at the beginning of the terminal line the name of the virtualenv! Check the example here:

    alexcomu-pc:bigdive alexcomu$ virtualenv envBigDive
    New python executable in envBigDive/bin/python
    Installing setuptools, pip, wheel...done.
    alexcomu-pc:bigdive alexcomu$ source envBigDive/bin/activate
    (envBigDive)alexcomu-pc:bigdive alexcomu$

From now, every package will be installed inside of the virtualenv and not in the global system!


## IPython Notebook

IPython Notebook is a an interactive computational environment, in which you can combine code execution, rich text, mathematics, plots and rich media.

[Link to IPython Notebook](https://ipython.org/notebook.html)

How to install:

    pip install jupyter

How to run:

    jupyter notebook

Suggestion: Create an alias on your machine, like:

    alias notebook='jupyter notebook'

In this way we'll simply call **notebook** to run the IPython Notebook server.

# Python

Run your IPython Notebook inside this folder and open the file **01_Python_Introduction** to start with Python Introduction!
