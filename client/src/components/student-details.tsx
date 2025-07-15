import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Student } from "@shared/schema";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Users, 
  Heart, 
  Bus,
  Shield,
  Edit,
  X
} from "lucide-react";
import { formatDate, calculateAge, getStatusColor } from "@/lib/utils";

interface StudentDetailsProps {
  student: Student;
  onClose: () => void;
  onEdit?: (student: Student) => void;
}

export function StudentDetails({ student, onClose, onEdit }: StudentDetailsProps) {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "academic", label: "Academic Info", icon: GraduationCap },
    { id: "contact", label: "Contact Info", icon: Phone },
    { id: "guardian", label: "Guardian Info", icon: Users },
    { id: "additional", label: "Additional Info", icon: Shield },
  ];

  const age = calculateAge(student.dateOfBirth);
  const statusColor = getStatusColor(student.status);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <CardTitle className="text-2xl">
                {student.firstName} {student.lastName}
              </CardTitle>
              <p className="text-muted-foreground">{student.registrationNumber}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={statusColor as any}>{student.status}</Badge>
                <Badge variant="outline">{student.department}</Badge>
                <Badge variant="outline">Year {student.year}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(student)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Tab Navigation */}
          <div className="flex border-b border-border mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === "personal" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Full Name</p>
                      <p className="text-sm text-muted-foreground">
                        {student.firstName} {student.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Date of Birth</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(student.dateOfBirth)} ({age} years old)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Gender</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {student.gender}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {student.bloodGroup && (
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Blood Group</p>
                        <p className="text-sm text-muted-foreground">
                          {student.bloodGroup}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {student.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {student.city}, {student.state} {student.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "academic" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Department</p>
                      <p className="text-sm text-muted-foreground">
                        {student.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Year & Semester</p>
                      <p className="text-sm text-muted-foreground">
                        Year {student.year}, Semester {student.semester}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Registration Number</p>
                      <p className="text-sm text-muted-foreground">
                        {student.registrationNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Admission Date</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(student.admissionDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge variant={statusColor as any}>{student.status}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email Address</p>
                      <p className="text-sm text-muted-foreground">
                        {student.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone Number</p>
                      <p className="text-sm text-muted-foreground">
                        {student.phone}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {student.emergencyContact && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Emergency Contact</p>
                        <p className="text-sm text-muted-foreground">
                          {student.emergencyContact}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Full Address</p>
                      <p className="text-sm text-muted-foreground">
                        {student.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {student.city}, {student.state} {student.zipCode}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {student.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "guardian" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Guardian Name</p>
                      <p className="text-sm text-muted-foreground">
                        {student.guardianName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Guardian Phone</p>
                      <p className="text-sm text-muted-foreground">
                        {student.guardianPhone}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {student.guardianEmail && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Guardian Email</p>
                        <p className="text-sm text-muted-foreground">
                          {student.guardianEmail}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "additional" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Hosteller</p>
                      <Badge variant={student.hosteller ? "success" : "secondary"}>
                        {student.hosteller ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                  {student.transportRoute && (
                    <div className="flex items-center gap-3">
                      <Bus className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Transport Route</p>
                        <p className="text-sm text-muted-foreground">
                          {student.transportRoute}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  {student.medicalConditions && (
                    <div className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Medical Conditions</p>
                        <p className="text-sm text-muted-foreground">
                          {student.medicalConditions}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
