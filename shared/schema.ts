import { pgTable, text, integer, timestamp, varchar, boolean, decimal, date } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const students = pgTable('students', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  registrationNumber: varchar('registration_number', { length: 50 }).unique().notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  phone: varchar('phone', { length: 20 }),
  dateOfBirth: date('date_of_birth'),
  gender: varchar('gender', { length: 10 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  zipCode: varchar('zip_code', { length: 20 }),
  country: varchar('country', { length: 100 }).default('India'),
  department: varchar('department', { length: 100 }).notNull(),
  year: integer('year').notNull(),
  semester: integer('semester').notNull(),
  section: varchar('section', { length: 5 }),
  admissionDate: date('admission_date').notNull(),
  cgpa: decimal('cgpa', { precision: 3, scale: 2 }),
  status: varchar('status', { length: 20 }).default('active'),
  guardianName: varchar('guardian_name', { length: 100 }),
  guardianPhone: varchar('guardian_phone', { length: 20 }),
  guardianEmail: varchar('guardian_email', { length: 255 }),
  emergencyContact: varchar('emergency_contact', { length: 20 }),
  bloodGroup: varchar('blood_group', { length: 5 }),
  hosteller: boolean('hosteller').default(false),
  transportRoute: varchar('transport_route', { length: 100 }),
  medicalConditions: text('medical_conditions'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const courses = pgTable('courses', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  courseCode: varchar('course_code', { length: 20 }).unique().notNull(),
  courseName: varchar('course_name', { length: 200 }).notNull(),
  credits: integer('credits').notNull(),
  semester: integer('semester').notNull(),
  department: varchar('department', { length: 100 }).notNull(),
  faculty: varchar('faculty', { length: 100 }),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const enrollments = pgTable('enrollments', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  studentId: integer('student_id').references(() => students.id).notNull(),
  courseId: integer('course_id').references(() => courses.id).notNull(),
  enrollmentDate: date('enrollment_date').notNull(),
  grade: varchar('grade', { length: 5 }),
  gradePoints: decimal('grade_points', { precision: 3, scale: 2 }),
  attendance: integer('attendance').default(0),
  semester: integer('semester').notNull(),
  academicYear: varchar('academic_year', { length: 20 }).notNull(),
  status: varchar('status', { length: 20 }).default('enrolled'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const faculty = pgTable('faculty', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  facultyId: varchar('faculty_id', { length: 50 }).unique().notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  phone: varchar('phone', { length: 20 }),
  department: varchar('department', { length: 100 }).notNull(),
  designation: varchar('designation', { length: 100 }),
  qualification: varchar('qualification', { length: 200 }),
  experience: integer('experience'),
  joiningDate: date('joining_date'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const departments = pgTable('departments', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 100 }).unique().notNull(),
  code: varchar('code', { length: 10 }).unique().notNull(),
  hodId: integer('hod_id').references(() => faculty.id),
  establishedYear: integer('established_year'),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const fees = pgTable('fees', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  studentId: integer('student_id').references(() => students.id).notNull(),
  feeType: varchar('fee_type', { length: 50 }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  dueDate: date('due_date').notNull(),
  paidDate: date('paid_date'),
  status: varchar('status', { length: 20 }).default('pending'),
  academicYear: varchar('academic_year', { length: 20 }).notNull(),
  semester: integer('semester').notNull(),
  transactionId: varchar('transaction_id', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const attendance = pgTable('attendance', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  studentId: integer('student_id').references(() => students.id).notNull(),
  courseId: integer('course_id').references(() => courses.id).notNull(),
  date: date('date').notNull(),
  status: varchar('status', { length: 10 }).notNull(), // present, absent, late
  remarks: text('remarks'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Student = typeof students.$inferSelect;
export type InsertStudent = typeof students.$inferInsert;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;
export type Faculty = typeof faculty.$inferSelect;
export type InsertFaculty = typeof faculty.$inferInsert;
export type Department = typeof departments.$inferSelect;
export type InsertDepartment = typeof departments.$inferInsert;
export type Fee = typeof fees.$inferSelect;
export type InsertFee = typeof fees.$inferInsert;
export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = typeof attendance.$inferInsert;

export const insertStudentSchema = createInsertSchema(students);

export const insertCourseSchema = createInsertSchema(courses);

export const insertEnrollmentSchema = createInsertSchema(enrollments);

export const insertFacultySchema = createInsertSchema(faculty);

export const insertDepartmentSchema = createInsertSchema(departments);

export const insertFeeSchema = createInsertSchema(fees);

export const insertAttendanceSchema = createInsertSchema(attendance);
export type InsertStudentType = z.infer<typeof insertStudentSchema>;
export type InsertCourseType = z.infer<typeof insertCourseSchema>;
export type InsertEnrollmentType = z.infer<typeof insertEnrollmentSchema>;
export type InsertFacultyType = z.infer<typeof insertFacultySchema>;
export type InsertDepartmentType = z.infer<typeof insertDepartmentSchema>;
export type InsertFeeType = z.infer<typeof insertFeeSchema>;
export type InsertAttendanceType = z.infer<typeof insertAttendanceSchema>;
