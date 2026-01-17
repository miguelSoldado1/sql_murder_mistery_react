# Solutions for added challenges

This document captures the clues and example SQL queries used to solve the three additional challenges beyond the classic SQL Murder Mystery.

## SQL Murder Mystery II

### Clues

Another crime has occurred and the detective needs your help once again. You've been handed a case file, but some crucial details are missing.
You remember that the crime was a murder that occurred on Jan.14, 2018 and that it took place in SQL City.
The victim was found at the Get Fit Now gym, and witnesses were present during the incident. Start by retrieving the corresponding crime scene report from the police department's database.

A murder occurred at Get Fit Now gym. Victim found in locker room at 6 AM.
Security cameras captured two witnesses: gym member with brown hair, 70 inches tall, driving Honda Civic, and someone with license plate WHT789.
Check their interview transcripts for what they saw.

I was doing cardio when I heard shouting from the locker room around 11:20 PM. I saw Ryan arguing with someone from behind. The person was tall, around 68 inches, with black hair. They seemed upset about business. I heard "keep your mouth shut about money!"

I witnessed part of the fight. I saw a man arguing with Ryan - he drove a black Dodge Charger. The guy looked young, maybe late twenties, upset about finances. The argument got heated before they went to the locker room. I left after.

I had issues with Ryan over our supplement business. He threatened to expose irregularities to authorities.
I went to confront him but didn't kill him! Someone else pulled the strings.
A woman from Elm Street at the Business Networking Mixer knew about my debts and had money to burn. She drives a BMW.

### Queries

```sql
select * from crime_scene_report where date = '20180114' and city = 'SQL City'
```

```sql
select i.transcript from person p
inner join drivers_license dl on dl.id = p.license_id
inner join interview i on i.person_id = p.id
where (dl.height = 70 and dl.hair_color = 'brown' and dl.car_model = 'Civic') or dl.plate_number = 'WHT789'
```

```sql
select * from person p
inner join drivers_license dl on dl.id = p.license_id
where dl.height = 68 and dl.hair_color = 'black' and dl.car_model = 'Charger'
```

```sql
select * from interview where person_id = 43829
```

```sql
select * from person p
inner join drivers_license dl on dl.id = p.license_id
inner join facebook_event_checkin ci on ci.person_id = p.id
where dl.car_make = 'BMW' and p.address_street_name = 'Elm Street' and ci.event_name = 'Business Networking Mixer'
```

## Cyberpunk Mystery I

### Clues

In the neon-lit sprawl of Neo-Tokyo, a high-tech heist has shaken the corporate elite.
The AI Core has been stolen from the secure vault on February 20, 2147.
Dive into the database to uncover the hacker, the insider, and the mastermind behind this cyberpunk conspiracy. Below is the schema diagram for this database.

The AI Core was stolen from the secure vault. Security drones detected a hacker with 5 neural implants, using a Neural Deck, with over 3 anomalies, in Sector 7 on February 20, 2147.

I broke into the vault. The insider who paid me 30000 in CryptoByte, used Access Implant cyberware, and was spotted in Sector 7 is the one who gave me the codes to get in.

I was just doing my job, but I saw the big boss who had 4 neural implants, paid the hacker 50000 in NeoCoin, and was operating out of Corporate on 21470220. I think that's all I know.

### Queries

```sql
select * from incident_report 
where date = '21470220' and type = 'theft' 
```

```sql
select * from person p
inner join location_log ll on ll.person_id = p.id
inner join device d on d.person_id = p.id
inner join digital_log dl on dl.device_id = d.id
inner join neural_implant ni on ni.person_id = p.id
where dl.anomaly_count > 3 and ll.sector = 'Sector 7' and ll.timestamp = '21470220'
group by p.name
having count(ni.id) = 5
```

```sql
select * from interrogation_log where person_id = 1025
```

```sql
select * from person p
inner join crypto_transaction ct on ct.person_id = p.id
inner join neural_implant ni on ni.person_id = p.id
where ct.amount = '30000' and ct.crypto_type = 'CryptoByte' and ni.cyberware_type = 'Access Implant'
```

```sql
select * from interrogation_log where person_id = 1050
```

```sql
select * from person p
inner join crypto_transaction ct on ct.person_id = p.id
inner join neural_implant ni on ni.person_id = p.id
inner join location_log ll on ll.person_id = p.id
where ct.amount = '50000' and ct.crypto_type = 'NeoCoin' and ll.sector = 'Corporate' and ll.timestamp = '21470220'
```

## Cyberpunk Mystery II

### Clues

Aegis Station went dark and the quantum failsafe failed. You vaguely remember that the incident happened on March 1, 2147,
and that an AI was moved into a ghost drive during the blackout. Start by finding the incident briefing from that date,
then follow the movement, device, and payment records until you can identify the runner, the insider, and the mastermind.

Failsafe collapsed at 21:09; vault scanners caught a Ghost Deck with six anomalies exiting toward Sector 9.
The runner is a Neural Broker based in Sector 9. Implant sync records show no sync for 10+ days (last sync on or before the 20th of February).

The buyer used a cloned clearance badge. Payment was exactly 45,000 SpectraCoin on March 1, 2147. Next, find the Security Chief on Core Deck with a Clearance Lattice implant.

The operation was funded by TWO payouts to the same person: 50,000 NeoCoin and 20,000 LuminaCredit.
The payer is a Lead Scientist in the Research Ring with four implants. Find who matches all of that.

### Queries

```sql
select * from incident_report where date = '21470301' and type = 'AI Breach'
```

```sql
select * from person p
inner join neural_implant ni on ni.person_id = p.id
inner join device d on d.person_id = p.id
inner join digital_log dl on dl.device_id = d.id
where ni.last_sync <= '21470220' and role = 'Neural Broker' and dl.anomaly_count = 6
```

```sql
select * from interrogation_log where person_id = 1212
```

```sql
select * from person p
inner join crypto_transaction ct on ct.person_id = p.id
inner join location_log ll on ll.person_id = p.id
inner join neural_implant ni on ni.person_id = p.id
where ct.amount = 45000 and ct.crypto_type = 'SpectraCoin' and role = 'Security Chief' and ll.sector = 'Core Deck' and ni.cyberware_type = 'Clearance Lattice'
```

```sql
select * from interrogation_log where person_id = 1206
```

```sql
select * from person p
inner join crypto_transaction ctn on ctn.person_id = p.id and ctn.amount = 50000 and ctn.crypto_type = 'NeoCoin'
inner join crypto_transaction ctl on ctl.person_id = p.id and ctl.amount = 20000 and ctl.crypto_type = 'LuminaCredit'
inner join neural_implant ni on ni.person_id = p.id
where p.role = 'Lead Scientist'
group by p.id having count(ni.id) = 4
```

## Cyberpunk Mystery III

### Clues

The Mirror Array in Neo-Tokyo was hijacked during a blackout, and the case file is missing the key specifics. Start by retrieving the incident report to recover the details, then use device telemetry, implant records, and interrogation logs to identify the runner, the insider, and the executive sponsor.

Mirror Array breach in Sector 6. Twin telemetry signatures detected: a Ghost Deck with six anomalies and a Neural Deck with four anomalies. The runner is a Neural Broker with five implants; last implant sync on or before March 1, 2147.

I ran the Mirror Array job, but I did not plan it. The buyer used a cloned clearance badge and paid exactly 45,000 SpectraCoin. They were a Security Chief on Core Deck with Clearance Lattice and Command Mesh implants.

The sponsor was a Corporate Exec using a Command Unit device that logged exactly two anomalies, and they had a Directive Stack implant.

### Queries

```sql
select * from incident_report where date = '21470312' and type='breach'
```

```sql
with devices as (
	select p.id from person p
	inner join device d on d.person_id = p.id
	inner join digital_log dl on dl.device_id = d.id
	inner join neural_implant ni on ni.person_id = p.id
	where dl.anomaly_count = 6 and d.device_type = 'Ghost Deck' and p.role = 'Neural Broker' and ni.last_sync <= 21470301
	group by (p.id)
	having count (ni.id) = 5
	union
	select p.id from person p
	inner join device d on d.person_id = p.id
	inner join digital_log dl on dl.device_id = d.id
	inner join neural_implant ni on ni.person_id = p.id
	where dl.anomaly_count = 4 and d.device_type = 'Neural Deck' and p.role = 'Neural Broker' and ni.last_sync <= 21470301
	group by (p.id)
	having count (ni.id) = 5
)

select * from person p
inner join devices d on d.id = p.id
inner join neural_implant ni on ni.person_id = p.id
inner join location_log ll on ll.person_id = p.id
where ni.last_sync <= 21470301 and p.role = 'Neural Broker' and ll.sector = 'Sector 6'
group by(p.id)
having count (ni.id) = 5
```

```sql
select * from interrogation_log where person_id = 1301
```

```sql
select * from person p
inner join neural_implant ni on ni.person_id = p.id
inner join crypto_transaction ct on ct.person_id = p.id
inner join location_log ll on ll.person_id = p.id
where ni.cyberware_type in ('Clearance Lattice', 'Command Mesh') and role = 'Security Chief' and ll.sector = 'Core Deck'
and ct.amount = 45000 and ct.crypto_type = 'SpectraCoin'
group by(p.id)
having count(distinct ni.cyberware_type) = 2
```

```sql
select * from interrogation_log where person_id = 1306
```

```sql
select p.name
from person p
inner join device d on d.person_id = p.id
inner join digital_log dl on dl.device_id = d.id
inner join neural_implant ni on ni.person_id = p.id
where dl.anomaly_count = 2 and role = 'Exec' and p.sector = 'Corporate'
	and d.device_type = 'Command Unit' and ni.cyberware_type = 'Directive Stack'
group by(p.id)
```
