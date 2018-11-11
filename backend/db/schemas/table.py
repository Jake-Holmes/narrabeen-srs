from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Enum, DateTime, Float
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields, post_load
import enum
import sys
import datetime
sys.path.insert(0, '../../')
from db.base import Base

class Table(Base):
	__tablename__ = 'tables'
	id = Column(Integer, primary_key=True)
	table_number = Column(Integer, nullable=False)
	seats = Column(Integer, nullable=False)
	qr_code = Column(String)
	passcode = Column(Integer, nullable=False)
	status = Column(Boolean, nullable=False)
	order = relationship("Order", uselist=False)

	def __init__(self, table_number, seats, passcode, status):
		self.table_number = table_number
		self.seats = seats
		self.passcode = passcode
		self.status = status

	def __repr__(self):
		return "<Table(id='{}', table_number='{}', qr_code='{}')>".format(self.id, self.table_number, self.qr_code)