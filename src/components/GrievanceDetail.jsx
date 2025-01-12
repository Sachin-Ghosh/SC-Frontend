import { format } from 'date-fns'
import { AlertTriangle, Calendar, CheckCircle, Clock, FileText, HelpCircle, User } from 'lucide-react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const GrievanceDetail = ({ grievance }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500';
      case 'RESOLVED':
        return 'bg-green-500';
      case 'REJECTED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  const getGrievanceTypeIcon = (type) => {
    switch (type) {
      case 'CHEATING':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'MISCONDUCT':
        return <User className="h-5 w-5 text-orange-500" />;
      case 'RULES_VIOLATION':
        return <FileText className="h-5 w-5 text-blue-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg">
      <CardHeader className="border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold mb-2">{grievance.title}</CardTitle>
            <CardDescription>Grievance ID: {grievance.id}</CardDescription>
          </div>
          <Badge className={`${getStatusColor(grievance.status)} text-white`}>
            {grievance.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Type and Event Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            {getGrievanceTypeIcon(grievance.grievance_type)}
            <span className="font-semibold">{grievance.grievance_type}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span>{grievance.event_name}</span>
          </div>
        </div>

        {/* Submission Details */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-500" />
            <span>Submitted by: {grievance.submitted_by_name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>Submitted on: {format(new Date(grievance.submission_date), 'PPpp')}</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Description:</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{grievance.description}</p>
        </div>

        {/* Evidence Files */}
        {grievance.evidence && grievance.evidence.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Evidence:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {grievance.evidence.map((file, index) => (
                <div key={index} className="space-y-2">
                  {file.file_type === 'IMAGE' ? (
                    <a 
                      href={`${import.meta.env.VITE_API_URL}${file.file_url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={`${import.meta.env.VITE_API_URL}${file.file_url}`}
                        alt={`Evidence ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                    </a>
                  ) : (
                    <a 
                      href={`${import.meta.env.VITE_API_URL}${file.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <FileText className="h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-700">View Document</span>
                    </a>
                  )}
                  <div className="text-xs text-gray-500">
                    <p>Uploaded by: {file.uploaded_by_name}</p>
                    <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                    <p>Date: {format(new Date(file.upload_date), 'PP')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resolution Details */}
        {grievance.assigned_to_name && (
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-500" />
            <span>Assigned to: {grievance.assigned_to_name}</span>
          </div>
        )}

        {grievance.resolution && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Resolution:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{grievance.resolution}</p>
          </div>
        )}

        {grievance.resolved_date && (
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Resolved on: {format(new Date(grievance.resolved_date), 'PPpp')}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default GrievanceDetail

