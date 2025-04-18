export const DUMMY_BOOKINGS = [
	{
		id: 1,
		idCustomer: 4,
		idIgloo: 1,
		checkIn: '2025-01-01',
		checkOut: '2025-01-03',
		paymentMethodId: 1,
		amount: 500.0,
		bookingDate: '2025-01-01',
		notes: 'This is a test booking',
		cancellationReason: null,
		createdBy: 1,
		earlyCheckInRequest: false,
		lateCheckOutRequest: false,
	},
	{
		id: 2,
		idCustomer: 5,
		idIgloo: 2,
		checkIn: '2025-04-01',
		checkOut: '2025-04-03',
		paymentMethodId: 1,
		amount: 400.0,
		bookingDate: '2025-01-01',
		notes: 'This is a test booking',
		cancellationReason: null,
		createdBy: 1,
		earlyCheckInRequest: false,
		lateCheckOutRequest: false,
	},
	{
		id: 3,
		idCustomer: 6,
		idIgloo: 3,
		checkIn: '2025-07-01',
		checkOut: '2025-07-03',
		paymentMethodId: 1,
		amount: 300.0,
		bookingDate: '2025-01-01',
		notes: 'This is a test booking',
		cancellationReason: null,
		createdBy: 1,
		earlyCheckInRequest: false,
		lateCheckOutRequest: false,
	},
	{
		id: 4,
		idCustomer: 7,
		idIgloo: 4,
		checkIn: '2025-10-01',
		checkOut: '2025-10-03',
		paymentMethodId: 1,
		amount: 200.0,
		bookingDate: '2025-01-01',
		notes: 'This is a test booking',
		cancellationReason: null,
		createdBy: 1,
		earlyCheckInRequest: false,
		lateCheckOutRequest: false,
	},
	{
		id: 5,
		idCustomer: 8,
		idIgloo: 5,
		checkIn: '2025-01-01',
		checkOut: '2025-01-03',
		paymentMethodId: 1,
		amount: 100.0,
		bookingDate: '2025-01-01',
		notes: 'This is a test booking',
		cancellationReason: null,
		createdBy: 1,
		earlyCheckInRequest: false,
		lateCheckOutRequest: false,
	},
	{
		id: 6,
		idCustomer: 9,
		idIgloo: 6,
		checkIn: '2025-04-01',
		checkOut: '2025-04-03',
		paymentMethodId: 1,
		amount: 100.0,
		bookingDate: '2025-01-01',
		notes: 'This is a test booking',
		cancellationReason: null,
		createdBy: 1,
		earlyCheckInRequest: false,
		lateCheckOutRequest: false,
	},
	{
		id: 7,
		idCustomer: 10,
		idIgloo: 7,
		checkIn: '2025-07-01',
		checkOut: '2025-07-03',
		paymentMethodId: 1,
		amount: 100.0,
		bookingDate: '2025-01-01',
		notes: 'This is a test booking',
		cancellationReason: null,
		createdBy: 1,
		earlyCheckInRequest: false,
		lateCheckOutRequest: false,
	},
	{
		id: 8,
		idCustomer: 11,
		idIgloo: 8,
		checkIn: '2025-10-01',
		checkOut: '2025-10-03',
		paymentMethodId: 1,
		amount: 100.0,
		bookingDate: '2025-01-01',
		notes: 'This is a test booking',
		cancellationReason: null,
		createdBy: 1,
		earlyCheckInRequest: false,
		lateCheckOutRequest: false,
	},
]

export const DUMMY_IGLOOS = [
	{
		id: 1,
		name: 'Cozy cabin',
		capacity: 4,
		pricePerNight: 300.0,
	},
	{
		id: 2,
		name: 'Arctic Retreat',
		capacity: 2,
		pricePerNight: 200.0,
	},
	{
		id: 3,
		name: 'Snowy Lodge',
		capacity: 3,
		pricePerNight: 250.0,
	},
	{
		id: 4,
		name: 'Frosty Hideaway',
		capacity: 2,
		pricePerNight: 200.0,
	},
	{
		id: 5,
		name: 'Icy Heaven',
		capacity: 5,
		pricePerNight: 400.0,
	},
	{
		id: 6,
		name: 'Northen Lights',
		capacity: 3,
		pricePerNight: 250.0,
	},
	{
		id: 7,
		name: 'Frozen Paradise',
		capacity: 4,
		pricePerNight: 300.0,
	},
	{
		id: 8,
		name: 'Polar Palace',
		capacity: 2,
		pricePerNight: 200.0,
	},
]

export const DUMMY_EMPLOYEES = [
	{
		id: 1,
		name: 'John',
		surname: 'Doe',
		email: 'jdoe@mail.com',
		phoneNumber: '1234567890',
		roleId: 1,
		adressId: 1,
	},
	{
		id: 2,
		name: 'Jane',
		surname: 'Smith',
		email: 'j.smith@mail.com',
		phoneNumber: '0987654321',
		roleId: 2,
		adressId: 2,
	},
	{
		id: 3,
		name: 'Alice',
		surname: 'Johnson',
		email: 'a.johnson@mail.com',
		phoneNumber: '1234567890',
		roleId: 3,
		adressId: 3,
	},
]

export const DUMMY_EMPLOYEE_ROLES = [
	{
		id: 1,
		roleName: 'recepcionist',
	},
	{
		id: 2,
		roleName: 'manager',
	},
	{
		id: 3,
		roleName: 'admin',
	},
]

export const DUMMY_EMPLOYEE_TASKS = [
	{
		id: 1,
		idEmployee: 1,
		task: 'Check in guests',
		taskDate: '2024-11-01',
		idStatus: 2,
	},
	{
		id: 2,
		idEmployee: 1,
		task: 'Check out guests',
		taskDate: '2024-11-02',
		idStatus: 2,
	},
	{
		id: 3,
		idEmployee: 1,
		task: 'Answer phone calls',
		taskDate: '2024-11-03',
		idStatus: 1,
	},
	{
		id: 4,
		idEmployee: 1,
		task: 'Respond to emails',
		taskDate: '2024-11-04',
		idStatus: 1,
	},
	{
		id: 5,
		idEmployee: 2,
		task: 'Check in guests',
		taskDate: '2024-11-01',
		idStatus: 2,
	},
	{
		id: 6,
		idEmployee: 2,
		task: 'Check out guests',
		taskDate: '2024-11-02',
		idStatus: 2,
	},
	{
		id: 7,
		idEmployee: 2,
		task: 'Answer phone calls',
		taskDate: '2024-11-03',
		idStatus: 1,
	},
	{
		id: 8,
		idEmployee: 2,
		task: 'Respond to emails',
		taskDate: '2024-11-04',
		idStatus: 1,
	},
	{
		id: 9,
		idEmployee: 3,
		task: 'Check in guests',
		taskDate: '2024-11-01',
		idStatus: 2,
	},
	{
		id: 10,
		idEmployee: 3,
		task: 'Check out guests',
		taskDate: '2024-11-02',
		idStatus: 2,
	},
	{
		id: 11,
		idEmployee: 3,
		task: 'Answer phone calls',
		taskDate: '2024-11-03',
		idStatus: 1,
	},
	{
		id: 12,
		idEmployee: 3,
		task: 'Respond to emails',
		taskDate: '2024-11-04',
		idStatus: 1,
	},
]

export const DUMMY_TASK_STATUS = [
	{
		id: 1,
		status: 'completed',
	},
	{
		id: 2,
		status: 'pending',
	},
]

export const DUMMY_CUSTOMERS = [
	{
		id: 4,
		name: 'Michael',
		surname: 'Jackson',
		email: 'm.jackso@mail.com',
		phoneNumber: '1234567890',
		adressId: 4,
	},
	{
		id: 5,
		name: 'Daniel',
		surname: 'Taylor',
		email: 'd.taylor@mail.com',
		phoneNumber: '1234567890',
		adressId: 5,
	},
	{
		id: 6,
		name: 'Sophia',
		surname: 'Anderson',
		email: 's.anderson@mail.com',
		phoneNumber: '1234567890',
		adressId: 6,
	},
	{
		id: 7,
		name: 'Matthew',
		surname: 'Thomas',
		email: 'm.thomas@mail.com',
		phoneNumber: '1234567890',
		adressId: 7,
	},
	{
		id: 8,
		name: 'Olivia',
		surname: 'Martinez',
		email: 'o.martinez@mail.com',
		phoneNumber: '1234567890',
		adressId: 8,
	},
	{
		id: 9,
		name: 'Ethan',
		surname: 'Hernandez',
		email: 'e.hernandez@mail.com',
		phoneNumber: '1234567890',
		adressId: 9,
	},
	{
		id: 10,
		name: 'Ava',
		surname: 'Young',
		email: 'a.young@mail.com',
		phoneNumber: '1234567890',
		adressId: 10,
	},
	{
		id: 11,
		name: 'Noah',
		surname: 'King',
		email: 'n.king@mail.com',
		phoneNumber: '1234567890',
		adressId: 15,
	},
	{
		id: 12,
		name: 'Isabella',
		surname: 'Wright',
		email: 'i.wright@mail.com',
		phoneNumber: '1234567890',
		adressId: 12,
	},
	{
		id: 13,
		name: 'Liam',
		surname: 'Lopez',
		email: 'l.lopez@mail.com',
		phoneNumber: '1234567890',
		adressId: 13,
	},
	{
		id: 14,
		name: 'Mia',
		surname: 'Hill',
		email: 'm.hill@mail.com',
		phoneNumber: '1234567890',
		adressId: 14,
	},
	{
		id: 15,
		name: 'Jan',
		surname: 'Nowak',
		email: 'j.nowak@mail.com',
		phoneNumber: '1234567890',
		adressId: 11,
	},
	{
		id: 16,
		name: 'Maria',
		surname: 'Kowalska',
		email: 'm.kowalska@mail.com',
		phoneNumber: '1234567890',
		adressId: 16,
	},
	{
		id: 17,
		name: 'Mariusz',
		surname: 'Kowalczyk',
		email: 'm.kowalczyk@mail.com',
		phoneNumber: '1234567890',
		adressId: 17,
	},
	{
		id: 18,
		name: 'Anne',
		surname: 'Smith',
		email: 'a.smith@mail.com',
		phoneNumber: '1234567890',
		adressId: 18,
	},
	{
		id: 19,
		name: 'Hlynur',
		surname: 'Gunnarsson',
		email: 'h.gunnarson@mail.com',
		phoneNumber: '1234567890',
		adressId: 20,
	},
	{
		id: 20,
		name: 'Isabelle',
		surname: 'Herbert',
		email: 'i.herbert@mail.com',
		phoneNumber: '1234567890',
		adressId: 21,
	},
	{
		id: 21,
		name: 'Sara',
		surname: 'Hansen',
		email: 's.hensen@mail.com',
		phoneNumber: '1234567890',
		adressId: 22,
	},
]

export const DUMMY_ADDRESSES = [
	{
		id: 1,
		street: 'Hatun',
		streetNumber: '5',
		houseNumber: null,
		city: 'Reykjavik',
		country: 'Iceland',
		postalCode: '101',
	},
	{
		id: 2,
		street: 'Laugavegur',
		streetNumber: '10',
		houseNumber: null,
		city: 'Reykjavik',
		country: 'Iceland',
		postalCode: '101',
	},
	{
		id: 3,
		street: 'Skolavordustigur',
		streetNumber: '15',
		houseNumber: null,
		city: 'Reykjavik',
		country: 'Iceland',
		postalCode: '101',
	},
	{
		id: 4,
		street: 'Calm Avenue',
		streetNumber: '20',
		houseNumber: null,
		city: 'Los Angeles',
		country: 'USA',
		postalCode: '90001',
	},
	{
		id: 5,
		street: 'Baker Street',
		streetNumber: '221B',
		houseNumber: null,
		city: 'London',
		country: 'UK',
		postalCode: 'NW1 6XE',
	},
	{
		id: 6,
		street: 'River Drive',
		streetNumber: '1',
		houseNumber: null,
		city: 'London',
		country: 'UK',
		postalCode: 'NW1 6XE',
	},
	{
		id: 7,
		street: 'Oak Avenue',
		streetNumber: '10',
		houseNumber: null,
		city: 'Liverpool',
		country: 'UK',
		postalCode: 'L1 1JQ',
	},
	{
		id: 8,
		street: 'Pine Road',
		streetNumber: '5',
		houseNumber: null,
		city: 'New York',
		country: 'USA',
		postalCode: '10001',
	},
	{
		id: 9,
		street: 'Sunset Boulevard',
		streetNumber: '1',
		houseNumber: null,
		city: 'Los Angeles',
		country: 'USA',
		postalCode: '90001',
	},
	{
		id: 10,
		street: 'Birch Lane',
		streetNumber: '5',
		houseNumber: null,
		city: 'Denver',
		country: 'USA',
		postalCode: '80202',
	},
	{
		id: 11,
		street: 'Wolska',
		streetNumber: '5',
		houseNumber: null,
		city: 'Warsaw',
		country: 'Poland',
		postalCode: '01-000',
	},
	{
		id: 12,
		street: 'Lisbon Park',
		streetNumber: '10',
		houseNumber: null,
		city: 'Lisbon',
		country: 'Portugal',
		postalCode: '1000-001',
	},
	{
		id: 13,
		street: 'Berlin Street',
		streetNumber: '15',
		houseNumber: null,
		city: 'Berlin',
		country: 'Germany',
		postalCode: '10115',
	},
	{
		id: 14,
		street: 'Paris Avenue',
		streetNumber: '20',
		houseNumber: null,
		city: 'Paris',
		country: 'France',
		postalCode: '75001',
	},
	{
		id: 15,
		street: 'Barcelona Street',
		streetNumber: '25',
		houseNumber: null,
		city: 'Barcelona',
		country: 'Spain',
		postalCode: '08001',
	},
	{
		id: 16,
		street: 'Oslo Avenue',
		streetNumber: '30',
		houseNumber: null,
		city: 'Oslo',
		country: 'Norway',
		postalCode: '0010',
	},
	{
		id: 17,
		street: 'Dublin Road',
		streetNumber: '35',
		houseNumber: null,
		city: 'Dublin',
		country: 'Ireland',
		postalCode: 'D01',
	},
	{
		id: 18,
		street: 'Sydney Street',
		streetNumber: '40',
		houseNumber: null,
		city: 'Sydney',
		country: 'Australia',
		postalCode: '2000',
	},
	{
		id: 20,
		street: 'Tokyo Avenue',
		streetNumber: '45',
		houseNumber: null,
		city: 'Tokyo',
		country: 'Japan',
		postalCode: '100-0001',
	},
	{
		id: 21,
		street: 'Moscow Street',
		streetNumber: '50',
		houseNumber: null,
		city: 'Moscow',
		country: 'Russia',
		postalCode: '101000',
	},
	{
		id: 22,
		street: 'Rome Avenue',
		streetNumber: '55',
		houseNumber: null,
		city: 'Rome',
		country: 'Italy',
		postalCode: '00100',
	},
]

export const DUMMY_DISCOUNTS = [
	{
		id: 1,
		idIgloo: 3,
		name: 'Family Special',
		discount: 20,
		description: 'Bookings with 4 or more people get 20% off',
	},
	{
		id: 2,
		idIgloo: 4,
		name: 'Summer Escape',
		discount: 10,
		description: 'Bookings in July get 10% off',
	},
	{
		id: 3,
		idIgloo: 5,
		name: 'Spring Special',
		discount: 15,
		description: 'Bookings in April get 15% off',
	},
	{
		id: 4,
		idIgloo: 10,
		name: 'Winter Wonderland',
		discount: 25,
		description: 'Bookings in December get 25% off',
	},
]

export const DUMMY_FORUM = [
	{
		id: 1,
		idEmployee: 1,
		title: 'Best practices for managing bookings',
		postContent: 'Share and discuss best practices for managing igloo bookings efficiently.',
		postDate: '2024-11-01',
		categoryId: 1,
		tags: ['bookings', 'customer service', 'best practices'],
	},
	{
		id: 2,
		idEmployee: 2,
		title: 'Customer service tips',
		postContent: 'Tips and strategies for providing excellent customer service to our igloo guests.',
		postDate: '2024-05-10',
		categoryId: 2,
		tags: ['tips'],
	},
	{
		id: 3,
		idEmployee: 3,
		title: 'Igloo maintenance schedule',
		postContent: 'Discuss the maintenance schedule for igloos and share tips on keeping them in top condition.',
		postDate: '2024-06-10',
		categoryId: 3,
		tags: ['managing'],
	},
]

export const DUMMY_FORUM_CATEGORIES = [
	{
		id: 1,
		categoryName: 'Announcements',
	},
	{
		id: 2,
		categoryName: 'Questions',
	},
	{
		id: 3,
		categoryName: 'Discussions',
	},
	{
		id: 4,
		categoryName: 'Guides',
	},
]

export const DUMMY_FORUM_COMMNETS = [
	{
		id: 1,
		idPost: 1,
		idEmployee: 2,
		comment: `I'm sharing my ideas`,
		commentDate: '2024-11-05',
	},
	{
		id: 2,
		idPost: 1,
		idEmployee: 2,
		comment: `Mee too!`,
		commentDate: '2024-11-06',
	},
	{
		id: 3,
		idPost: 2,
		idEmployee: 1,
		comment: `Customer is always right!`,
		commentDate: '2024-05-11',
	},
	{
		id: 4,
		idPost: 2,
		idEmployee: 3,
		comment: `Gold!`,
		commentDate: '2024-05-11',
	},
	{
		id: 5,
		idPost: 3,
		idEmployee: 1,
		comment: `Don't know`,
		commentDate: '2024-06-11',
	},
	{
		id: 6,
		idPost: 3,
		idEmployee: 2,
		comment: `Mee too :(`,
		commentDate: '2024-06-11',
	},
	{
		id: 7,
		idPost: 1,
		idEmployee: 1,
		comment: `test comment`,
		commentDate: '2024-11-25',
	},
	{
		id: 8,
		idPost: 1,
		idEmployee: 3,
		comment: `Send notifications`,
		commentDate: '2024-11-25',
	},
]

export const DUMMY_PAYMENT_METHODS = [
	{
		id: 1,
		name: 'Cash',
	},
	{
		id: 2,
		name: 'Credit Card',
	},
	{
		id: 3,
		name: 'Transfer',
	},
	{
		id: 4,
		name: 'PayPal',
	},
	{
		id: 5,
		name: 'ApplePay',
	},
]

export function getBookings() {
	const bookings = DUMMY_BOOKINGS.map(booking => {
		const customers = DUMMY_CUSTOMERS.find(customer => customer.id === booking.idCustomer)
		const igloos = DUMMY_IGLOOS.find(igloo => igloo.id === booking.idIgloo)
		const paymentMethods = DUMMY_PAYMENT_METHODS.find(paymentMethod => paymentMethod.id === booking.paymentMethodId)
		const employees = DUMMY_EMPLOYEES.find(employee => employee.id === booking.createdBy)
		return {
			...booking,
			customerName: customers.name,
			customerSurname: customers.surname,
			customerEmail: customers.email,
			customerPhoneNumber: customers.phoneNumber,
			iglooName: igloos.name,
			paymentMethod: paymentMethods.name,
			employeeName: employees.name,
			employeeSurname: employees.surname,
		}
	})

	return bookings
}

export function getIgloos() {
	const igloos = DUMMY_IGLOOS.map(igloo => {
		const discount = DUMMY_DISCOUNTS.find(discount => discount.idIgloo === igloo.id)
		return {
			...igloo,
			discount: discount ? discount.name : 0,
		}
	})

	return igloos
}

export function getEmployees() {
	const employees = DUMMY_EMPLOYEES.map(employee => {
		const address = DUMMY_ADDRESSES.find(address => address.id === employee.adressId)
		const role = DUMMY_EMPLOYEE_ROLES.find(role => role.id === employee.roleId)
		const tasks = DUMMY_EMPLOYEE_TASKS.filter(task => task.idEmployee === employee.id).map(task => {
			const status = DUMMY_TASK_STATUS.find(status => status.id === task.idStatus)
			return {
				...task,
				status: status.status,
			}
		})

		return {
			...employee,
			address: address,
			role: role.roleName,
			tasks: tasks,
		}
	})

	return employees
}

export function getCustomers(){
	const customers = DUMMY_CUSTOMERS.map(customer => {
		const address = DUMMY_ADDRESSES.find(address => address.id === customer.adressId)
		const bookings = DUMMY_BOOKINGS.filter(booking => booking.idCustomer === customer.id)

		return {
			...customer,
			address: address,
			bookings: bookings,
		}
	})

	return customers
}

export function getForumPosts(){
	const forumPosts = DUMMY_FORUM.map(post => {
		const employee = DUMMY_EMPLOYEES.find(employee => employee.id === post.idEmployee)
		const category = DUMMY_FORUM_CATEGORIES.find(category => category.id === post.categoryId)
		const comments = DUMMY_FORUM_COMMNETS.filter(comment => comment.idPost === post.id)

		return {
			...post,
			employee: employee,
			category: category,
			comments: comments,
		}
	})

	return forumPosts
}