import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Eye, 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  Settings, 
  BarChart3,
  Camera,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { useState } from "react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "monasteries", label: "Monasteries", icon: <Camera className="h-4 w-4" /> },
    { id: "archives", label: "Digital Archive", icon: <FileText className="h-4 w-4" /> },
    { id: "users", label: "User Management", icon: <Users className="h-4 w-4" /> },
    { id: "reviews", label: "Content Review", icon: <Shield className="h-4 w-4" /> }
  ];

  const analyticsData = [
    { label: "Total Visitors", value: "12,847", change: "+12.5%", trend: "up" },
    { label: "Virtual Tours Taken", value: "3,456", change: "+8.2%", trend: "up" },
    { label: "Journeys Planned", value: "1,234", change: "+15.7%", trend: "up" },
    { label: "Archive Downloads", value: "2,891", change: "-2.1%", trend: "down" },
  ];

  const recentActivities = [
    { id: 1, action: "New monastery added", details: "Ralang Monastery virtual tour uploaded", time: "2 hours ago", status: "success" },
    { id: 2, action: "User review flagged", details: "Inappropriate content reported for Rumtek", time: "4 hours ago", status: "warning" },
    { id: 3, action: "Archive item uploaded", details: "Kangyur manuscript collection added", time: "6 hours ago", status: "success" },
    { id: 4, action: "System maintenance", details: "Database optimization completed", time: "1 day ago", status: "info" },
    { id: 5, action: "Security alert", details: "Multiple failed login attempts detected", time: "2 days ago", status: "error" },
  ];

  const monasteries = [
    { id: 1, name: "Rumtek Monastery", status: "Active", tours: 3, visitors: 1247, lastUpdate: "2 days ago" },
    { id: 2, name: "Pemayangtse Monastery", status: "Active", tours: 2, visitors: 892, lastUpdate: "5 days ago" },
    { id: 3, name: "Tashiding Monastery", status: "Pending", tours: 1, visitors: 567, lastUpdate: "1 week ago" },
    { id: 4, name: "Enchey Monastery", status: "Active", tours: 2, visitors: 734, lastUpdate: "3 days ago" },
  ];

  const pendingReviews = [
    { id: 1, type: "User Review", title: "Rumtek Monastery Experience", author: "Tourist123", status: "Pending", priority: "Medium" },
    { id: 2, type: "Virtual Tour", title: "Tashiding 360° Update", author: "Admin", status: "In Review", priority: "High" },
    { id: 3, type: "Archive Item", title: "Prayer Wheel Inscriptions", author: "Researcher", status: "Pending", priority: "Low" },
    { id: 4, type: "Scam Report", title: "Fake Tour Guide Alert", author: "Visitor456", status: "Urgent", priority: "High" },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "urgent": return "bg-red-100 text-red-800";
      case "in review": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getActivityIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold font-playfair bg-gradient-monastery bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage monasteries, archives, and user content for MonasteryExplorer
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-gradient-monastery hover:shadow-monastery">
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-monastery-gold text-monastery-gold bg-monastery-gold/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsData.map((item, index) => (
              <Card key={index} className="hover:shadow-monastery transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                      <p className="text-2xl font-bold font-playfair">{item.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${
                      item.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {item.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
                      {getActivityIcon(activity.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-monastery hover:shadow-monastery">
                  <Camera className="h-4 w-4 mr-2" />
                  Add New Virtual Tour
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Archive Item
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage User Roles
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Review Flagged Content
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Monasteries Tab */}
      {activeTab === "monasteries" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold font-playfair">Monastery Management</h2>
            <Button className="bg-gradient-monastery hover:shadow-monastery">
              <Plus className="h-4 w-4 mr-2" />
              Add Monastery
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left p-4 font-medium">Name</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Tours</th>
                      <th className="text-left p-4 font-medium">Visitors</th>
                      <th className="text-left p-4 font-medium">Last Update</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monasteries.map((monastery) => (
                      <tr key={monastery.id} className="border-b hover:bg-muted/30">
                        <td className="p-4 font-medium">{monastery.name}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(monastery.status)}>
                            {monastery.status}
                          </Badge>
                        </td>
                        <td className="p-4">{monastery.tours}</td>
                        <td className="p-4">{monastery.visitors}</td>
                        <td className="p-4 text-muted-foreground">{monastery.lastUpdate}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Content Review Tab */}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold font-playfair">Content Review Queue</h2>
            <Badge variant="secondary">{pendingReviews.length} items pending</Badge>
          </div>

          <div className="grid gap-4">
            {pendingReviews.map((item) => (
              <Card key={item.id} className="hover:shadow-monastery transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{item.title}</h3>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.type} by {item.author}
                      </p>
                      <p className={`text-sm font-medium ${getPriorityColor(item.priority)}`}>
                        Priority: {item.priority}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-gradient-monastery hover:shadow-monastery">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Other tabs would be implemented similarly */}
      {activeTab === "archives" && (
        <Card>
          <CardContent className="p-12 text-center">
            <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Digital Archive Management</h3>
            <p className="text-muted-foreground mb-4">
              Upload and manage manuscripts, artifacts, and cultural heritage items
            </p>
            <Button className="bg-gradient-monastery">
              Upload New Archive Item
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === "users" && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Management</h3>
            <p className="text-muted-foreground mb-4">
              Manage user accounts, roles, and permissions
            </p>
            <Button className="bg-gradient-monastery">
              Manage Users
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;
