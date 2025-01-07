interface Registration {
    teacher: string;
    students: string[];
  }
  
  const registrations: Registration[] = [];
  
  export const registerTeacherWithStudents = async (
    teacher: string,
    students: string[]
  ): Promise<void> => {
    const existing = registrations.find((r) => r.teacher === teacher);
  
    if (existing) {
      existing.students = Array.from(new Set([...existing.students, ...students]));
    } else {
      registrations.push({ teacher, students });
    }
  };
  
  export const getRegisteredStudents = (teacher: string): string[] | undefined => {
    const registration = registrations.find((r) => r.teacher === teacher);
    return registration?.students;
  };
  