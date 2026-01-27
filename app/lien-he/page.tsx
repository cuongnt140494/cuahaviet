"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Building,
  AlertCircle,
} from "lucide-react";
import { isValidEmail, isValidVietnamesePhone, stripHtml } from "@/lib/utils";

const contactInfo = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Địa chỉ",
    content: "123 Đường ABC, Quận Cầu Giấy, Hà Nội",
    subtext: "Showroom Cửa Hà Việt",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Hotline",
    content: "0919 086 272",
    subtext: "Hỗ trợ 8:00 - 18:00",
    color: "from-green-500 to-emerald-500",
    isPhone: true,
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    content: "contact@cuahaviet.vn",
    subtext: "Phản hồi trong 24h",
    color: "from-orange-500 to-red-500",
    isEmail: true,
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Giờ làm việc",
    content: "8:00 - 18:00",
    subtext: "Thứ 2 - Chủ nhật",
    color: "from-purple-500 to-violet-500",
  },
];

const showrooms = [
  {
    name: "Showroom Cầu Giấy",
    address: "123 Đường ABC, Quận Cầu Giấy, Hà Nội",
    phone: "0919 086 272",
    hours: "8:00 - 18:00",
  },
  {
    name: "Showroom Thanh Xuân",
    address: "456 Đường XYZ, Quận Thanh Xuân, Hà Nội",
    phone: "0919 086 272",
    hours: "8:00 - 18:00",
  },
  {
    name: "Showroom Long Biên",
    address: "789 Đường DEF, Quận Long Biên, Hà Nội",
    phone: "0919 086 272",
    hours: "8:00 - 18:00",
  },
];

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    const cleanName = stripHtml(formData.name.trim());
    if (!cleanName || cleanName.length < 2) {
      newErrors.name = "Vui lòng nhập họ tên (ít nhất 2 ký tự)";
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!isValidVietnamesePhone(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // Validate email (optional but must be valid if provided)
    if (formData.email.trim() && !isValidEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Validate message
    const cleanMessage = stripHtml(formData.message.trim());
    if (!cleanMessage || cleanMessage.length < 10) {
      newErrors.message = "Vui lòng nhập nội dung (ít nhất 10 ký tự)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Sanitize data before sending
    const sanitizedData = {
      name: stripHtml(formData.name.trim()),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      subject: formData.subject,
      message: stripHtml(formData.message.trim()),
    };

    // Simulate API call (backend not implemented per user request)
    console.log("Form submitted:", sanitizedData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-20">
        <Card className="max-w-lg mx-4 border-0 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-12 text-center text-white">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <CheckCircle className="h-12 w-12" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Gửi thành công!</h2>
            <p className="text-white/90 mb-8">
              Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
            </p>
            <Link href="/">
              <Button variant="secondary" size="lg" className="rounded-xl gap-2">
                Về trang chủ
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
          <nav className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-white/70 mb-6 md:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
            <span className="text-white">Liên hệ</span>
          </nav>
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/10 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              Liên hệ
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-lg text-white/70">
              Để lại thông tin để được tư vấn miễn phí và nhận báo giá tốt nhất
              cho công trình của bạn tại Hà Nội
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative -mt-12 z-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {info.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">{info.title}</h3>
                  {info.isPhone ? (
                    <a href={`tel:${info.content.replace(/\s/g, "")}`} className="text-lg font-bold text-primary hover:underline">
                      {info.content}
                    </a>
                  ) : info.isEmail ? (
                    <a href={`mailto:${info.content}`} className="text-lg font-bold text-primary hover:underline break-all">
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-lg font-bold text-foreground">{info.content}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{info.subtext}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6">
                  <div className="flex items-center gap-3 text-white">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Gửi tin nhắn</h2>
                      <p className="text-sm text-white/70">
                        Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại sớm
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 lg:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Họ và tên <span className="text-destructive">*</span>
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Nguyễn Văn A"
                          required
                          className={`h-12 rounded-xl ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Số điện thoại <span className="text-destructive">*</span>
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="0912 345 678"
                          required
                          className={`h-12 rounded-xl ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && (
                          <p id="phone-error" className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@example.com"
                          className={`h-12 rounded-xl ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Chủ đề
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">Chọn chủ đề</option>
                          <option value="bao-gia">Yêu cầu báo giá</option>
                          <option value="ho-tro">Hỗ trợ kỹ thuật</option>
                          <option value="bao-hanh">Bảo hành sản phẩm</option>
                          <option value="khac">Khác</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Nội dung <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Mô tả chi tiết yêu cầu của bạn..."
                        rows={5}
                        required
                        className={`flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 rounded-xl gap-2 text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Gửi tin nhắn
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                    <p className="font-medium text-muted-foreground">Google Maps</p>
                    <p className="text-sm text-muted-foreground">Bản đồ vị trí Cửa Hà Việt</p>
                  </div>
                </div>
              </Card>

              {/* Quick Contact */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">Liên hệ nhanh</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Gọi ngay để được tư vấn miễn phí
                  </p>
                  <a href="tel:0919086272" className="block">
                    <Button variant="secondary" className="w-full h-12 rounded-xl gap-2 text-base">
                      <Phone className="h-5 w-5" />
                      0919 086 272
                    </Button>
                  </a>
                </div>
              </Card>

              {/* Social Links */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Kết nối với chúng tôi</h3>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://zalo.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 48 48">
                        <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm-2.5 26.5h-5v-5h5v5zm0-7h-5v-8h5v8zm9 7h-5v-5h5v5zm0-7h-5v-8h5v8z" />
                      </svg>
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Showrooms Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 rounded-full">
              <Building className="h-3 w-3 mr-1" />
              Showroom
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hệ thống showroom tại Hà Nội
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ghé thăm showroom gần bạn nhất để được tư vấn và trải nghiệm sản phẩm
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showrooms.map((showroom, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover:scale-110 transition-transform">
                      <Building className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg">{showroom.name}</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{showroom.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                      <a href={`tel:${showroom.phone.replace(/\s/g, "")}`} className="text-primary hover:underline font-medium">
                        {showroom.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground">{showroom.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
