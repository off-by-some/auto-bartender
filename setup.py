from setuptools import setup

setup(
    name='hx711',
    version='0.1',
    description='HX711 Python Library for Raspberry Pi',
    py_modules=['hx711'],
    install_requires=['cython==0.29.24','Rpi.GPIO==0.7.0', 'numpy==1.21.1'],
)

