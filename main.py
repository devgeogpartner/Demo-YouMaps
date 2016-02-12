#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import webapp2
import json
import logging 
import xml.etree.ElementTree as ET
import urllib
import re

from google.appengine.api import urlfetch , taskqueue
from google.appengine.ext.webapp import template
from google.appengine.api import users





class MainHandler(webapp2.RequestHandler):
  def get(self) :
	template_values = {}
	path = os.path.join(os.path.dirname(__file__), 'index.html')
	self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication([('/', MainHandler)], debug=True)
