import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
	if (req.method !== 'POST')
		return res.status(405).json({
			success: false,
			message: 'Method not allowed.',
		});

	// data sent via POST
	const contactData = JSON.parse(req.body);

	// Here you would typically handle the form submission,
	// e.g., save the message to a database or send an email.

	const { error } = await supabase.from('contact').insert([contactData]);

	if (error) {
		console.error('Error saving contact message:', error);

		return res.status(500).json({
			success: false,
			message: 'Failed to send message. Please try again later.',
		});
	}

	res.status(200).json({
		success: true,
		message: 'Thank you for your message! We will get back to you soon. :)',
	});
}
