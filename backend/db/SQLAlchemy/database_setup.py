import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String, Binary, Enum, DateTime, func, Boolean, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

#Make an instance of the declarative_base class
'''The declarative_base will let SQLAlchemy know that our classes are special SQLAlchemy classes that correspond to tables in our database.'''
Base= declarative_base()

#create a class name, and make it extend from the Base class
'''We will need to create  classes to correspond with the tables we want to create in our database. Inside each of our classes, we must create a table representation.
We use the special variable, double underscore table name double underscore to let SQLAlchemy know the variable that we will use to refer to our table..'''
class UserAcc(Base):
	__tablename__ = 'useracc'
	#maps python object to columns in the database
	UserID = Column(Integer, primary_key=True)
	FristName = Column(String, nullable=False)
	LastName = Column(String, nullable=False)
	UserName = Column(String, nullable=False)
	UserPassword = Column(Binary, nullable=False)
	AccessLevel = Column(Enum)
	Email = Column(String, nullable=False)
	
	#StaffID = Column(Integer, ForeignKey('staff.StaffID'))
	#staff = relationship(Staff)
	#TableID = Column(Integer, ForeignKey('table.TableID'))
	#table = relationship(Table)
	
	
class Staff(Base):
	__tablename__ = 'staff'
	#maps python object to columns in the database
	StaffID = Column(Integer, primary_key=True)
	StaffRole = Column(String, nullable=False)
	UserID = Column(ForeignKey('useracc.UserID'))
	useracc = relationship(UserAcc)
	
class TakeAway(Base):
	__tablename__ = 'takeaway'
	#maps python object to columns in the database
	TakeAwayID = Column(Integer, primary_key=True)
	PickupTime = Column(DateTime, nullable=False)
	#CustomerID = Column(Integer, ForeignKey('customer.CustomerID'))
	#customer = relationship(Customer)	
	
class Customer(Base):
	__tablename__ = 'customer'
	#maps python object to columns in the database
	CustomerID = Column(Integer, primary_key=True)
	CustPhone = Column(String, nullable=False)
	CustomerFirstName = Column(String, nullable=False)
	CustomerLastName = Column(String, nullable=False)
	IsBanned = Column(Boolean, nullable=True)
	TimeSlotID = Column(Integer, nullable=True)
	TakeAwayID = Column(Integer, ForeignKey('takeaway.TakeAwayID'))
	takeaway = relationship(TakeAway)
	
	
class TimeSlot(Base):
	__tablename__ = 'timeslot'
	#maps python object to columns in the database
	TimeSlotID = Column(Integer, primary_key=True)
	StartTime = Column(Integer, nullable=True)
	Duration = Column(Integer, nullable=True)
	
	CustomerID = Column(Integer, ForeignKey('customer.CustomerID'))
	customer = relationship(Customer)

	
class Table(Base):
	__tablename__ = 'table'
	#maps python object to columns in the database
	TableID = Column(Integer, primary_key=True)
	TableNumber = Column(Integer, nullable=False)
	NumberSeats = Column(Integer, nullable=True)
	
	UserID = Column(Integer, ForeignKey('timeslot.TimeSlotID'))
	timeslot = relationship(TimeSlot)
	
class Order(Base):
	__tablename__ = 'order'
	#maps python object to columns in the database
	OrderID = Column(Integer, primary_key=True)
	#Use default=func.now() to set the default order time to be the current time when the order was created.
	DateCreated = Column(DateTime, default=func.now())
	OrderType = Column(Enum)
	IsPaid = Column(Boolean, nullable=True)
	QR = Column(String, nullable=True)

	TakeAwayID = Column(Integer, ForeignKey('takeaway.TakeAwayID'))
	#Create a variable called lowercase customer which is the relationship between my class Customer.
	takeaway = relationship(TakeAway)
	
	TableID = Column(Integer, ForeignKey('table.TableID'))
	table = relationship(Table)
	

class OrderDish(Base):
	__tablename__ = 'orderdish'
	#maps python object to columns in the database
	OrderDishID = Column(Integer, primary_key=True)
	
	Quantity = Column(Integer,nullable=False)
	isCooked = Column(Boolean, nullable=True)
	
	OrderID = Column(Integer, ForeignKey('order.OrderID'))
	order= relationship(Order)

class MenuDish(Base):
	__tablename__ = 'menudish'
	#maps python object to columns in the database
	DishID = Column(Integer, primary_key=True)
	DishName = Column(String, nullable=False)
	DishDescrption = Column(String, nullable=True)
	DishImage = Column(String, nullable=False)
	Price = Column(Float)
	OrderDishID = Column(Integer, ForeignKey('orderdish.OrderDishID'))
	orderdish= relationship(OrderDish)


####### insert at end of file #######
'''Create an instance of our create_engine class and point to the database we will use. Since we are using SQLite 3, the create_engine will create a new file that we can use similarly to a more robust database like MySQL'''

engine = create_engine('sqlite:///restaurantmenu.db')

''' Create Base.metadata.create_all(engine), which goes into the database and adds the classes we will soon create as new tables in our database.'''
Base.metadata.create_all(engine)