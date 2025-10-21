import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Who we are</h2>
            <p>Our website address is: https://imobilesupreme.lk.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-2">What personal data we collect and why we collect it</h2>

            <h3 className="text-xl font-medium mt-4 mb-1">Comments</h3>
            <p>
              When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.
            </p>
            <p>
              An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-1">Media</h3>
            <p>
              If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-1">Contact forms</h3>
            <p>We may collect personal information through contact forms, such as your name, email address, and message content, to respond to your inquiries.</p>

            <h3 className="text-xl font-medium mt-4 mb-1">Cookies</h3>
            <p>
              If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
            </p>
            <p>
              If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
            </p>
            <p>
              When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
            </p>
            <p>
              If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-1">Embedded content from other websites</h3>
            <p>
              Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
            </p>
            <p>
              These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
            </p>

            <h3 className="text-xl font-medium mt-4 mb-1">Analytics</h3>
            <p>We may use analytics services to collect and analyze information about site usage to improve our services.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-2">Who we share your data with</h2>
            <p>We do not share your personal data with third parties except as necessary for site operations, such as payment processors for e-commerce transactions, or as required by law.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-2">How long we retain your data</h2>
            <p>
              If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.
            </p>
            <p>
              For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-2">What rights you have over your data</h2>
            <p>
              If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-2">Where we send your data</h2>
            <p>Visitor comments may be checked through an automated spam detection service.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-2">Your contact information</h2>
            <p>We may use your contact information to communicate with you about your orders, inquiries, or updates related to our services.</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-2">Additional information</h2>

            <h3 className="text-xl font-medium mt-4 mb-1">How we protect your data</h3>
            <p>We implement reasonable security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.</p>

            <h3 className="text-xl font-medium mt-4 mb-1">What data breach procedures we have in place</h3>
            <p>In the event of a data breach, we will notify affected users and relevant authorities as required by law.</p>

            <h3 className="text-xl font-medium mt-4 mb-1">What third parties we receive data from</h3>
            <p>We may receive data from third-party services such as payment gateways or analytics providers.</p>

            <h3 className="text-xl font-medium mt-4 mb-1">What automated decision making and/or profiling we do with user data</h3>
            <p>We do not engage in automated decision-making or profiling that produces legal effects or similarly significantly affects you.</p>

            <h3 className="text-xl font-medium mt-4 mb-1">Industry regulatory disclosure requirements</h3>
            <p>We comply with applicable data protection laws and regulations in our jurisdiction.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;