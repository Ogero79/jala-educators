import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  BarChart3, 
  Trash2, 
  Star, 
  Mail, 
  Phone, 
  Calendar,
  Shield,
  LogOut,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminStats {
  totalSubscriptions: number;
  totalBookings: number;
  totalFeedback: number;
  averageRating: number;
  recentActivity: {
    subscriptions: number;
    bookings: number;
    feedback: number;
  };
}

interface Subscription {
  id: number;
  email_address: string;
  created_at: string;
}

interface Booking {
  id: number;
  parent_name: string;
  parent_phone: string;
  parent_email: string;
  student_name: string;
  student_grade: string;
  created_at: string;
}

interface Feedback {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  submitted_at: string;
}

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  
  // Data states
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  
  // Check if already authenticated on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setIsAuthenticated(true);
      loadDashboardData();
    }
  }, []);

  const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        handleLogout();
        throw new Error('Session expired');
      }
      throw new Error('Request failed');
    }

    return response.json();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      if (response.ok) {
        localStorage.setItem('adminToken', password);
        setIsAuthenticated(true);
        loadDashboardData();
      } else {
        setAuthError('Invalid admin password. Please try again.');
      }
    } catch (error) {
      setAuthError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setPassword('');
    setStats(null);
    setSubscriptions([]);
    setBookings([]);
    setFeedback([]);
  };

  const loadDashboardData = async () => {
    try {
      const statsData = await apiRequest('/api/admin/stats');
      setStats(statsData.stats);
    } catch (error) {
    }
  };

  const loadSubscriptions = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/api/admin/subscriptions');
      setSubscriptions(data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/api/admin/bookings');
      setBookings(data.data);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const loadFeedback = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/api/admin/feedback');
      setFeedback(data.data);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (type: 'subscriptions' | 'bookings' | 'feedback', id: number) => {
    if (!confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) {
      return;
    }

    try {
      await apiRequest(`/api/admin/${type}/${id}`, { method: 'DELETE' });
      
      // Refresh data and stats
      loadDashboardData();
      if (type === 'subscriptions') loadSubscriptions();
      else if (type === 'bookings') loadBookings();
      else if (type === 'feedback') loadFeedback();
    } catch (error) {
      alert(`Failed to delete ${type.slice(0, -1)}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-secondary fill-secondary' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md mx-4">
        <div className="text-center mb-6 sm:mb-8">
          <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-3 sm:mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Admin Access</h1>
          <p className="text-sm sm:text-base text-muted">Enter your admin credentials to continue</p>
        </div>          <form onSubmit={handleLogin} className="space-y-6">
            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {authError}
              </div>
            )}
            
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  required
                  disabled={loading}
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted hover:text-foreground transition-colors"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Authenticating...
                </>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-subtle">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center min-w-0">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3 flex-shrink-0" />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground truncate">
                <span className="hidden sm:inline">JALA Admin Dashboard</span>
                <span className="sm:hidden">Admin</span>
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 sm:px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-border">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="ml-3 sm:ml-4 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted truncate">Newsletter Subscriptions</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.totalSubscriptions}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-border">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                </div>
                <div className="ml-3 sm:ml-4 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted truncate">Program Bookings</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.totalBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-border">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="ml-3 sm:ml-4 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted truncate">Feedback Received</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.totalFeedback}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-border">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                </div>
                <div className="ml-3 sm:ml-4 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted truncate">Average Rating</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.averageRating.toFixed(1)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-border mb-6 sm:mb-8">
          <div className="border-b border-border">
            <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto scrollbar-hide">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'subscriptions', label: 'Subscriptions', icon: Mail },
                { id: 'bookings', label: 'Bookings', icon: BookOpen },
                { id: 'feedback', label: 'Feedback', icon: MessageSquare }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (tab.id === 'subscriptions') loadSubscriptions();
                      else if (tab.id === 'bookings') loadBookings();
                      else if (tab.id === 'feedback') loadFeedback();
                    }}
                    className={`flex items-center py-3 sm:py-4 px-2 sm:px-3 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted hover:text-foreground hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            {activeTab === 'overview' && stats && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">Recent Activity</h2>
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="bg-subtle rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3">Last 7 Days</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      <div className="text-center sm:text-left">
                        <p className="text-lg sm:text-xl font-bold text-primary">{stats.recentActivity.subscriptions}</p>
                        <p className="text-xs sm:text-sm text-muted">new subscriptions</p>
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-lg sm:text-xl font-bold text-secondary">{stats.recentActivity.bookings}</p>
                        <p className="text-xs sm:text-sm text-muted">new bookings</p>
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-lg sm:text-xl font-bold text-primary">{stats.recentActivity.feedback}</p>
                        <p className="text-xs sm:text-sm text-muted">feedback received</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subscriptions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Newsletter Subscriptions</h2>
                  <span className="text-sm text-muted">{subscriptions.length} total subscriptions</span>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : subscriptions.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-muted">No newsletter subscriptions yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="inline-block min-w-full align-middle">
                      <table className="min-w-full divide-y divide-border">
                        <thead className="bg-subtle">
                          <tr>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Email</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden sm:table-cell">Date</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-border">
                          {subscriptions.map((subscription) => (
                            <tr key={subscription.id} className="hover:bg-subtle">
                              <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground">
                                <div className="truncate max-w-[200px] sm:max-w-none" title={subscription.email_address}>
                                  {subscription.email_address}
                                </div>
                                <div className="sm:hidden text-xs text-muted mt-1">
                                  {formatDate(subscription.created_at)}
                                </div>
                              </td>
                              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-muted hidden sm:table-cell">
                                {formatDate(subscription.created_at)}
                              </td>
                              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                                <button
                                  onClick={() => deleteItem('subscriptions', subscription.id)}
                                  className="text-red-600 hover:text-red-800 transition-colors p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Program Bookings</h2>
                  <span className="text-sm text-muted">{bookings.length} total bookings</span>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-muted">No program bookings yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-0">
                    {/* Mobile Card Layout */}
                    <div className="sm:hidden space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white border border-border rounded-lg p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-foreground truncate">{booking.parent_name}</h3>
                              {booking.parent_email && (
                                <p className="text-xs text-muted truncate">{booking.parent_email}</p>
                              )}
                            </div>
                            <button
                              onClick={() => deleteItem('bookings', booking.id)}
                              className="text-red-600 hover:text-red-800 transition-colors p-1 ml-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <p className="text-muted font-medium">Phone</p>
                              <p className="text-foreground">{booking.parent_phone}</p>
                            </div>
                            <div>
                              <p className="text-muted font-medium">Student</p>
                              <p className="text-foreground">{booking.student_name}</p>
                            </div>
                            <div>
                              <p className="text-muted font-medium">Grade</p>
                              <p className="text-foreground">{booking.student_grade}</p>
                            </div>
                            <div>
                              <p className="text-muted font-medium">Date</p>
                              <p className="text-foreground">{formatDate(booking.created_at)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Table Layout */}
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="min-w-full divide-y divide-border">
                        <thead className="bg-subtle">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Parent</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Grade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-border">
                          {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-subtle">
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-foreground">{booking.parent_name}</div>
                                {booking.parent_email && (
                                  <div className="text-sm text-muted truncate max-w-[200px]">{booking.parent_email}</div>
                                )}
                              </td>
                              <td className="px-6 py-4 text-sm text-foreground">
                                <div className="flex items-center">
                                  <Phone className="w-4 h-4 mr-2 text-muted" />
                                  {booking.parent_phone}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-foreground">
                                {booking.student_name}
                              </td>
                              <td className="px-6 py-4 text-sm text-foreground">
                                {booking.student_grade}
                              </td>
                              <td className="px-6 py-4 text-sm text-muted">
                                {formatDate(booking.created_at)}
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => deleteItem('bookings', booking.id)}
                                  className="text-red-600 hover:text-red-800 transition-colors p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'feedback' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-foreground">User Feedback</h2>
                  <span className="text-sm text-muted">{feedback.length} feedback received</span>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : feedback.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-muted">No feedback received yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {feedback.map((item) => (
                      <div key={item.id} className="bg-white border border-border rounded-lg p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-3 sm:space-y-0">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground truncate">{item.name}</h3>
                            <p className="text-sm text-muted capitalize">{item.role}</p>
                            <p className="text-xs text-muted mt-1">{formatDate(item.submitted_at)}</p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                            <div className="flex-1 sm:flex-none">
                              {renderStars(item.rating)}
                            </div>
                            <button
                              onClick={() => deleteItem('feedback', item.id)}
                              className="text-red-600 hover:text-red-800 transition-colors p-1 ml-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed break-words">{item.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;